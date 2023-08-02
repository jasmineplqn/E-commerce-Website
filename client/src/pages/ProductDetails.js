import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

// display one product and its details
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  // fetching the product details and the company details
  useEffect(() => {
    let mounted = true;

    const fetchItemData = async () => {
      const response = await fetch(`/api/item/${params.itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setProduct(data.data);
          await fetchCompanyData(data.data.companyId);
        }
      }
    };

    const fetchCompanyData = async (companyId) => {
      const response = await fetch(`/api/company/${companyId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setCompany(data.data);
        }
      }
    };

    fetchItemData();

    return () => {
      mounted = false;
    };
  }, [params.itemId]);

  const handleAddToCart = () => {
    setFetched(true);
    setStatus(null);
    setError(null);

    fetch("/api/add-item-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: product._id,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          setError(data.message);

          throw new Error(data.message);
        } else {
          setStatus("Added to cart!");
        }
      })
      .catch((error) => {
        console.error(error);
        setFetched(false);
      });
  };

  return (
    <>
      {!product || !company ? (
        <Loading>Loading...</Loading>
      ) : (
        <Container>
          <StatusBox>
            {error && <Error>{error}</Error>}
            {status && <Status>{status}</Status>}
          </StatusBox>
          <ProductBox>
            <Image src={product.imageSrc} alt="productImg" />
            <DetailsBox>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <div>
                <Price>{product.price}</Price>
                <Info>
                  <div>
                    <Details>Details</Details>
                    <DetailsList>
                      Designed by{" "}
                      <StyledLink to={`/company/${company._id}`}>
                        {company.name}
                      </StyledLink>
                      <Location>Used on: {product.body_location}</Location>
                    </DetailsList>
                  </div>
                </Info>

                {product.numInStock === 0 ? (
                  <DisabledButton>OUT OF STOCK</DisabledButton>
                ) : (
                  <Flex>
                    <Quantity>
                      <QuantButtonContainer>
                        <QuantButton
                          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                          disabled={quantity === 1}
                        >
                          -
                        </QuantButton>
                        <QuantityValue>{quantity}</QuantityValue>
                        <QuantButton
                          onClick={() =>
                            setQuantity(
                              Math.min(quantity + 1, product.numInStock)
                            )
                          }
                          disabled={quantity === product.numInStock}
                        >
                          +
                        </QuantButton>
                      </QuantButtonContainer>
                      {quantity >= product.numInStock && (
                        <MessageQuant>Maximum amount in stock!</MessageQuant>
                      )}
                    </Quantity>

                    <Button onClick={handleAddToCart}>ADD TO CART</Button>
                  </Flex>
                )}
              </div>
            </DetailsBox>
          </ProductBox>
        </Container>
      )}
    </>
  );
};

export default ProductDetails;

const Container = styled.div`
  margin: 2rem;
  margin-top: 8rem;
`;

const StatusBox = styled.div``;

const ProductBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;

  @media screen and (min-width: 750px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 30vh;
  @media screen and (min-width: 750px) {
    width: 45vh;
  }
`;

//Backend styling
const Loading = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem;
`;

const Status = styled.p`
  margin-bottom: 3rem;
  color: #155724;
  width: auto;
  padding: 1rem;
  background-color: #d4edda;
  border-color: #c3e6cb;
`;
const Error = styled.p`
  margin-bottom: 3rem;
  color: #721c24;
  width: auto;
  padding: 1rem;
  background-color: #f8d7da;
  border-color: #f5c6cb;
`;

//Item Details
const ProductCategory = styled.p`
  color: grey;
`;
const ProductName = styled.p`
  font-size: 1.5em;
  font-weight: bold;
`;
const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20em;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
  margin-bottom: 2rem;
`;
const Details = styled.p`
  font-size: 1.5em;
  margin-bottom: 0.5em;
`;

const DetailsList = styled.div`
  margin-left: 1em;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
const QuantityValue = styled.span`
  margin: 0 10px;
`;

const MessageQuant = styled.p`
  margin-left: 30px;
`;
const Price = styled.p`
  font-size: 1.1rem;
  color: black;
  margin: 1rem 0 1rem 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-style: italic;
  color: #2020bc;
`;

const Location = styled.div`
  margin-bottom: 0.7rem;
`;
const Stock = styled.p`
  font-style: italic;
  color: #ff3434;
  margin: 0.7em 0 2em 0;
`;

const Label = styled.label`
  margin-right: 0.2rem;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

//Buttons
const QuantButtonContainer = styled.div`
  border: solid black 1px;
  padding: 0.8em 1em 0.8em 1em;
`;
const QuantButton = styled.button`
  all: unset;
  cursor: pointer;
`;
const Button = styled.button`
  all: unset;
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.5rem 0 0.5rem 0;
  width: 100%;
  height: 2em;
  text-align: center;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  background-color: black;
  &:hover {
    background-color: white;
    border: solid black 2px;
    color: black;
  }
`;

const DisabledButton = styled.button`
  all: unset;
  margin-top: 0.5rem;
  padding: 0.5rem 0 0.5rem 0;
  width: 100%;
  height: 2em;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: white;
  border: solid grey 2px;
  color: grey;
`;
