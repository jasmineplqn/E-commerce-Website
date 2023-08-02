import React from "react";
import { styled, keyframes } from "styled-components";
import AboutBanner from "../assets/images/about-picture.jpg";
import Jasmine from "../assets/teammates/jasmine.png";
import Gabriel from "../assets/teammates/gab.jpg";
import Nishteman from "../assets/teammates/nishteman.jpg";
import Emma from "../assets/teammates/emma.jpg";
import Karam from "../assets/teammates/karam.jpg";
import { NavLink } from "react-router-dom";

//We are using NavLinks to redirect the user to our portfolio website upon clicking on our icons
const AboutPage = () => {
  return (
    <Container>
      <Banner alt="man looking at his watch" src={AboutBanner} />

      <h2>OUR VISION</h2>

      <TextBox>
        <p>
          We strive to bridge the accessibility gap in technology. Our mission
          is to empower individuals by making cutting-edge technology accessible
          to all.{" "}
        </p>
      </TextBox>
      <Team>THE TEAM BEHIND IT</Team>
      <TeamBox>
        <NavLinks
          target="#"
          to="https://portfolio-website-jasmineplqn.vercel.app/"
        >
          <Box>
            <TeamImage src={Jasmine} />
            <p>Jasmine Poliquin</p>
          </Box>
        </NavLinks>
        <NavLinks target="#" to="https://gab-go-portfolio.vercel.app/">
          <Box>
            <TeamImage src={Gabriel} />
            <p>Gabriel Gosselin</p>
          </Box>
        </NavLinks>
        <NavLinks
          target="#"
          to="https://personal-portfolio-phi-lac.vercel.app/"
        >
          <Box>
            <TeamImage src={Karam} />
            <p>Karam Hamwi</p>
          </Box>
        </NavLinks>
        <NavLinks target="#" to="https://portfolio-sanam.vercel.app/">
          <Box>
            <TeamImage src={Nishteman} />
            <p>Nishteman Saadi</p>
          </Box>
        </NavLinks>
        <NavLinks target="#" to="https://portfolio-emma.vercel.app/">
          <Box>
            <TeamImage src={Emma} />
            <p>Emma Van Voorst</p>
          </Box>
        </NavLinks>
      </TeamBox>
    </Container>
  );
};

const teamAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0.5;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const h2animation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const panimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 400px;

  h2 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 20px;
    opacity: 0;
    animation: ${h2animation} 1s ease 1s forwards;
    color: white;
    margin-top: -600px;
  }
`;

const Banner = styled.img`
  margin-top: 20px;
  filter: brightness(60%);
`;

const TextBox = styled.div`
  text-align: center;
  max-width: 750px;
  padding: 20px;
  border: 2px solid white;
  z-index: 3;
  margin: 0px 20px;
  color: white;
  animation: ${panimation} 1s ease forwards;
  animation-delay: 2s;
  opacity: 0;
  margin-bottom: 450px;
  p {
    font-size: 1.5em;
    font-weight: 500;
  }
`;
const TeamBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${teamAnimation} 1s ease forwards;
  animation-delay: 2.5s;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  transition: 300ms;
  text-decoration: none;
  color: black;
  cursor: pointer;

  p {
    font-size: 1.2em;
    font-weight: 500;
  }

  &:hover {
    scale: 1.05;
  }
`;

const Team = styled.h3`
  color: black;
  font-size: 1.8em;
  padding: 20px 60px;
  border-bottom: 1px solid black;
  animation: ${teamAnimation} 1s ease forwards;
  animation-delay: 2.5s;
  opacity: 0;
  margin-bottom: 20px;
`;

const TeamImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const NavLinks = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

export default AboutPage;
