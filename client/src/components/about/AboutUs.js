import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
//clicking on the arrow, it will navigate to the /about page that will display cool animation then clickable icons
const AboutUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <h2>ABOUT US</h2>
      <Box>
        <div>
          <p>Welcome to GadgetGo!</p>

          <p>Our Story:</p>
          <p>
            GadgetGo was founded with the vision of revolutionizing the way
            people shop online. With the rapid growth of e-commerce, we
            recognized the need to create a platform that offers a wide range of
            high-quality products, exceptional customer service, and innovative
            features that enhance the overall shopping experience.
          </p>

          <p>Our Mission:</p>
          <p>
            Our mission is to connect customers with their desired products in a
            simple, secure, and efficient manner. We strive to offer a diverse
            selection of products, ranging from everyday essentials to unique
            and specialized items, catering to different interests and
            lifestyles. We aim to be your go-to destination for all your
            shopping needs.
          </p>

          <p>Product Quality:</p>
          <p>
            We are committed to providing only the best quality products to our
            customers. Our team works tirelessly to curate a collection of
            products from reputable brands and trusted suppliers. We
            meticulously evaluate each product to ensure it meets our stringent
            quality standards, giving you confidence in your purchase.
          </p>

          <p>Happy Shopping!</p>
          <p>The GadgetGo Team</p>
        </div>
        <i onClick={handleClick} className="fa-solid fa-arrow-right"></i>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;

  h2 {
    font-weight: 400;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    max-width: 150px;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  p {
    max-width: 500px;
    margin-left: 20px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;

  i {
    scale: 5;
    margin-left: 120px;
    margin-right: 40px;
    transition: 400ms;
    cursor: pointer;

    &:hover {
      transform: translateX(20%);
    }
  }
`;

export default AboutUs;
