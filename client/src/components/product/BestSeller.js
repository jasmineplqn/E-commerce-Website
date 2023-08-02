import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

// components for displaying a couple items in the home section as "best sellers" (they are placeholders not best sellers yet)
const BestSeller = ({ items }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h2>BestSellers</h2>
      <ItemsBox>
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              onClick={() => {
                navigate(`/allproducts/${item._id}`);
              }}
            >
              <img src={item.imageSrc} />
            </Item>
          );
        })}
      </ItemsBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;

  @media screen and (max-width: 1100px) {
    width: 100vw;
  }

  h2 {
    font-weight: 400;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    padding: 0px 40px;
    height: 40px;

    margin-bottom: 30px;

    @media screen and (max-width: 1100px) {
      margin-top: 30px;
    }
  }
`;

const ItemsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 40px;
  max-width: 400px;
`;

const Item = styled.div`
  border-radius: 20px;
  width: 150px;
  height: 150px;
  flex: 0 0 33.33%;
  box-sizing: border-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: 300ms;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    width: 30px;
    height: 120px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 20px;
  }
  &:hover {
    scale: 1.1;
  }
`;

export default BestSeller;
