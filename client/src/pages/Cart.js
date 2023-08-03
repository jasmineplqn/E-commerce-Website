import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getServerUrl } from "../helpers/helpers";

//cart logic that receives the cart items from backend , deletes them , or post them using the checkout button
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  //fetching cart items
  const fetchCartItems = () => {
    fetch(`${getServerUrl()}/api/cart`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching cart items");
        }
      })
      .then((parsed) => {
        return fetchItemsDetails(parsed.data);
      })
      .then((itemsWithDetails) => {
        setCartItems(itemsWithDetails);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //fetching cart items details such as price
  const fetchItemsDetails = (items) => {
    const itemDetailsPromises = items.map((item) => {
      return fetch(`${getServerUrl()}/api/item/${item._id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((parsed) => {
          if (parsed) {
            //converting price from string to a number so we do calculations
            const priceWithoutSymbol = parsed.data.price.replace("$", "");
            item.details = {
              ...parsed.data,
              price: parseFloat(priceWithoutSymbol),
            }; // we pushed the items in the cart into item.details to use it later in our return
            return item; // Return the modified item object
          } else {
            return item;
          }
        })
        .catch((error) => {
          console.error(error);
          return item;
        });
    });

    //store all promises and execute them when they are met
    return Promise.all(itemDetailsPromises)
      .then((itemDetails) => itemDetails.filter((item) => item !== null))
      .catch((error) => {
        console.error(error);
        return items;
      });
  };

  //decrease quant logic
  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  //increase quant logic , the limit is the number of articles in stock
  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (
      updatedCartItems[index].quantity <
      updatedCartItems[index].details.numInStock
    ) {
      updatedCartItems[index].quantity++;
      setCartItems(updatedCartItems);
    }
  };

  //logic for calculating the total order price
  const calculateOrderTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.details.price * item.quantity;
    });
    return total;
  };

  const handleCheckout = () => {
    // Perform post request to submit the cartItems for checkout
    fetch(`${getServerUrl()}/api/purchase-item`, {
      method: "POST",
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Do something after successful checkout, e.g., show confirmation message
          navigate("/confirmation", {
            state: { purchaseInfo: cartItems },
          });
        } else {
          throw new Error("Error during checkout");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteItem = (itemId) => {
    // Perform delete request to remove a single item from the cart
    fetch(`${getServerUrl()}/api/delete-item/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the cartItems state to reflect the deletion
          const updatedCartItems = cartItems.filter(
            (item) => item._id !== itemId
          );
          setCartItems(updatedCartItems);
        } else {
          throw new Error("Error deleting item from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmptyCart = () => {
    // Perform delete request to remove all items from the cart
    fetch(`${getServerUrl()}/api/delete-AllItems`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the cartItems state to reflect the deletion of all items
          setCartItems([]);
        } else {
          throw new Error("Error deleting all items from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      ) : cartItems.length > 0 ? (
        <>
          <ItemList>
            {cartItems.map((item, index) => (
              <Item key={index}>
                <ItemImage
                  src={item.details.imageSrc}
                  alt={item.details.name}
                />
                <ItemDetails>
                  <ProductName>{item.details.name}</ProductName>
                  <Category>{item.details.category}</Category>
                  <Price>
                    Price: $
                    <span>
                      {(item.details.price * item.quantity).toFixed(2)}
                    </span>
                  </Price>
                  <Quantity>
                    <Button onClick={() => decreaseQuantity(index)}>-</Button>
                    <QuantityValue>{item.quantity}</QuantityValue>
                    <Button onClick={() => increaseQuantity(index)}>+</Button>
                    {/* it shows a message upon reaching max quantity in stock */}
                    {item.quantity >= item.details.numInStock && (
                      <MessageQuant>Maximum amount in stock!</MessageQuant>
                    )}
                    <DeleteButton onClick={() => handleDeleteItem(item._id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </DeleteButton>
                  </Quantity>
                </ItemDetails>
              </Item>
            ))}
          </ItemList>
          <BottomSection>
            <OrderTotal>
              ORDER TOTAL: ${calculateOrderTotal().toFixed(2)}
            </OrderTotal>

            {/* redirect user to confirmation page */}

            <BtnBox>
              <CheckoutButton onClick={handleCheckout}>
                Proceed to Checkout
              </CheckoutButton>

              <EmptyCartButton onClick={handleEmptyCart}>
                Empty Cart
              </EmptyCartButton>
            </BtnBox>
          </BottomSection>

          {/* Delete all items from the cart */}
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 30px;
  margin-top: 120px;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-right: 50px;
`;

const ItemImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
`;

const ItemDetails = styled.div``;

const ProductName = styled.div`
  font-weight: bold;
`;

const Category = styled.div`
  margin-top: 5px;
  font-style: italic;
`;

const Price = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  span {
    font-weight: 500;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
`;

const QuantityValue = styled.span`
  margin: 0 10px;
`;

const OrderTotal = styled.div`
  margin-top: 20px;
  font-weight: bold;
  margin-right: 50px;
`;

const CheckoutButton = styled.button`
  margin-top: 10px;
  margin-right: 20px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 1px solid black;
  transition: 200ms;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: #161616;
    color: white;
  }
`;

const MessageQuant = styled.p`
  margin-left: 30px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  margin-left: 30px;
  color: red;
  scale: 1.1;
  transition: 200ms;

  &:active {
    scale: 0.9;
  }
`;

const EmptyCartButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #161616;
  border: 1px solid black;
  color: white;

  cursor: pointer;
  font-weight: 500;
  transition: 200ms;

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: white;
    color: black;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 50px;
`;

const BtnBox = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

export default Cart;
