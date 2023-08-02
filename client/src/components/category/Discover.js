import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "./CategoryContext";

const Discover = () => {
  //use context to get the context from another component
  const { category, setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setCategory(index);
    navigate("/allproducts");
  };
  return (
    <Container>
      <Title>DISCOVER OUR CATEGORIES</Title>
      <CategoryBorder>
        <CategoriesBox>
          <Category onClick={() => handleTabClick(0)}>LIFESTYLE</Category>
          <Category onClick={() => handleTabClick(1)}>FITNESS</Category>
          <Category onClick={() => handleTabClick(2)}>MEDICAL</Category>
          <Category onClick={() => handleTabClick(3)}>ENTERTAINEMENT</Category>
        </CategoriesBox>
      </CategoryBorder>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  font-weight: 400;
  margin-bottom: 50px;
  margin-left: 20px;
`;

const CategoryBorder = styled.div`
  border-bottom: 1px grey solid;
  border-top: 1px grey solid;
`;
const CategoriesBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
`;

const Category = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: 300ms;
  padding: 20px 100px;

  &:hover {
    scale: 1.2;
  }

  @media screen and (max-width: 1070px) {
    padding: 20px 20px;
  }
`;

export default Discover;
