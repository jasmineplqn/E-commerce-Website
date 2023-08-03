import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "../assets/images/text-logo.png";
import { getServerUrl } from "../helpers/helpers";

//component displaying a sidescroll with company logo that navigates to a company page

const Header = () => {
  //tracking items if we need to show the suggestions
  const [allItems, setAllItems] = useState([]);
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const listRef = useRef(null);

  const matchedItems = allItems.filter((item) => {
    if (value.length < 2) {
      return false;
    }
    return item.name.toLowerCase().includes(value.toLowerCase());
  });
  //so we dont have infinite suggestions
  const limit = matchedItems.slice(0, 7);

  useEffect(() => {
    fetch(`${getServerUrl()}/api/get-items`)
      .then((response) => response.json())
      .then((parse) => {
        setAllItems(parse.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //closing List when clicking off
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  //home navigation
  const handleClick = () => {
    navigate("/");
  };
  //change on the search bar
  const handleChange = (event) => {
    setValue(event.target.value);
    setShowList(true);
  };

  return (
    <Box>
      <Title src={Logo} />
      <Container>
        <Button onClick={handleClick}>
          <i className="fa-solid fa-house"></i>
        </Button>
        <InputBox>
          <i className="fa-solid fa-magnifying-glass"></i>
          <ListContainer ref={listRef}>
            <input
              value={value}
              type="text"
              placeholder="Search"
              onChange={handleChange}
              onClick={() => setShowList(true)}
            />
            {showList && (
              <List>
                {limit.map((item) => {
                  const index = item.name
                    .toLowerCase()
                    .indexOf(value.toLowerCase());
                  const firstHalf = item.name.slice(0, index + value.length);
                  const secondHalf = item.name.slice(index + value.length);
                  const category = item.category;
                  const handleClick = () => {
                    navigate(`/allproducts/${item._id}`);
                    setValue("");
                    setShowList(false);
                  };
                  return (
                    <ListItem key={item._id} onClick={handleClick}>
                      <span>
                        {firstHalf}
                        <Prediction>{secondHalf}</Prediction>

                        {category && <Category>{category}</Category>}
                      </span>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </ListContainer>
        </InputBox>
        <Button as={Link} to="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
        </Button>
      </Container>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: white;
`;

const Title = styled.img`
  padding: 20px;
  font-size: 2em;
  white-space: nowrap;
  border-right: 1px solid black;
  width: 300px;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;

  input {
    outline: none;
    padding: 26px;
    border: none;
    font-size: 1.4em;
    @media screen and (max-width: 750px) {
      width: 100%;
    }
  }
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  i {
    margin-left: 40px;
    scale: 1.5;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  position: absolute;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin-top: 10px;
  background-color: white;
  width: 362px;
  top: 75px;
  left: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  padding-left: 10px;

  width: 100%;

  &:hover {
    background-color: #e9e9e9;
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Category = styled.p`
  color: #9966ff;
  text-align: right;
`;
const Button = styled.button`
  padding: 32px;
  background-color: white;
  border: none;
  border-left: 1px solid black;
  border-right: 1px solid black;
  cursor: pointer;
  color: black;
  i {
    scale: 2;
  }
`;

export default Header;
