import React, { useContext, useState, useEffect } from "react";
import { styled } from "styled-components";
import { CategoryContext } from "../category/CategoryContext";
import { NavLink } from "react-router-dom";
import CompanySideBar from "../company/CompanySideBar";
import Loading from "../Loading";
import { getServerUrl } from "../../helpers/helpers";

const Container = styled.div``;

const CategoryBorder = styled.div`
  border-bottom: 1px grey solid;
`;

const CategoriesBox = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 4em;
`;

const Category = styled.div`
  align-self: center;
  cursor: pointer;
  padding: 10px 100px;
  &:hover {
    transition: 300ms;
    scale: 1.2;
  }
  &.active {
    border-bottom: solid black 1px;
  }

  @media screen and (max-width: 1070px) {
    padding: 10px 20px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  max-width: 70vw;
`;
const Column = styled.div`
  padding: 4em;
  flex: 1;
  max-width: 350px;
`;
const Name = styled.p`
  margin-top: 1em;
`;
const Price = styled.p`
  color: grey;
  font-style: italic;
`;

const ProdLink = styled(NavLink)`
  all: unset;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
`;

const CompanyWrapper = styled.div`
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const LoadingBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const CategoryTab = () => {
  // useContext for to get context of category from another componant
  const { category, setCategory } = useContext(CategoryContext);
  const [items, setAllItems] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch(`${getServerUrl()}/api/get-items`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setAllItems(parse.items);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  //to switch between different states (tabs) which are our categories
  const handleTabClick = (index) => {
    setCategory(index);
  };

  //to hold the different constants of categories
  const categoriesItems = {
    Lifestyle: items.filter((item) => item.category === "Lifestyle"),
    Fitness: items.filter((item) => item.category === "Fitness"),
    Medical: items.filter((item) => item.category === "Medical"),
    Entertainment: items.filter((item) => item.category === "Entertainment"),
  };

  return (
    <Container>
      <CategoryBorder>
        <CategoriesBox>
          {Object.keys(categoriesItems).map((key, index) => (
            <Category
              key={index}
              active={category === index}
              className={category === index ? "active" : ""} //this is our active tab
              onClick={() => handleTabClick(index)}
            >
              {key}
            </Category>
          ))}
        </CategoriesBox>
      </CategoryBorder>
      <Flex>
        <CompanyWrapper>
          <CompanySideBar />
        </CompanyWrapper>
        <ProductContainer>
          {items !== undefined ? (
            //mapping items into each category then we pull them with a link
            categoriesItems[Object.keys(categoriesItems)[category]].map(
              (item, index) => (
                <Column key={item._id}>
                  <ProdLink to={`/allproducts/${item._id}`}>
                    <img src={item.imageSrc} />
                    <Name>{item.name}</Name>
                    <Price>{item.price}</Price>
                  </ProdLink>
                </Column>
              )
            )
          ) : (
            <LoadingBox>
              <Loading />
            </LoadingBox>
          )}
        </ProductContainer>
      </Flex>
    </Container>
  );
};

export default CategoryTab;
