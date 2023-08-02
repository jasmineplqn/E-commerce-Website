import { styled } from "styled-components";
import Logo from "../assets/images/full-logo.png";

//it displays the logo and the email of the company
const Footer = () => {
  return (
    <Container>
      <img alt="logo" src={Logo} />
      <Box>
        <span>2022 - 2023.</span>
        <>GadgetGo@gmail.com</>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  padding-bottom: 50px;

  img {
    width: 150px;
  }
`;

const Box = styled.div`
  display: flex;

  span {
    margin-right: 30px;
  }
`;
export default Footer;
