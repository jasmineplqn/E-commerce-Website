import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading";

//confirmation page, upon clicking on checkout from the cart

const Confirmation = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state;
  const [showContent, setShowContent] = useState(false);

  // Set a timer to show the content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    // Clean up the timer when the component unmounts or when the dependency changes
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      {showContent ? (
        <>
          <h2>Receipt Details</h2>
          <PurchaseInfo>
            {purchaseInfo.map((item, index) => (
              <div key={index}>
                <img src={item.details.imageSrc} alt={item.details.name} />
                <h3>{item.details.name}</h3>
                <p>Price: ${item.details.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </PurchaseInfo>
          <ReturnSection>
            <ReturnText>
              Thank you from our team! If you need more items, feel free to go
              back to the homepage:
            </ReturnText>
            <ReturnButton to="/">Go to Homepage</ReturnButton>
          </ReturnSection>
        </>
      ) : (
        // Show loading message

        <LoadingBox>
          <StyledHeading>Thank you for your purchase!</StyledHeading>
          <Loading />
        </LoadingBox>
      )}
    </Container>
  );
};

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const PurchaseInfo = styled.div`
  background-color: dark gray;
  margin-top: 40px;
  max-width: 600px;
  margin: 0 20px;
  line-height: 30px;
  div {
    margin-bottom: 40px;
  }
`;

const ReturnButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 20px;
  background-color: black;
  color: #fff;
  border: 1px solid black;
  transition: 200ms;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 200px;
  h2 {
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    width: 200px;
    margin-bottom: 50px;
  }
`;

const ReturnSection = styled.div`
  margin-top: 30px;
`;

const ReturnText = styled.p`
  font-style: italic;
  color: #888;
  margin: 20px;
`;

const StyledHeading = styled.h1`
  opacity: 1;
  transition: opacity 0.5s ease;
  animation: fadeIn 1s;
  font-weight: 500;
  color: black;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Confirmation;
