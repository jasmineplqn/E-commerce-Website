import { styled } from "styled-components";
import Image from "../assets/images/productsheader.jpg";
import CategoryTab from "../components/home/CategoryTab";

const Wrapper = styled.div``;

const Container = styled.div`
  position: relative;
  margin-top: 80px;
  height: 100%;
`;

const HeroText = styled.div`
  position: absolute;
  color: white;
  font-size: 2rem;
  bottom: 20px;
  left: 16px;
`;
const HeroImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  object-position: 25% 25%;
`;

const AllProducts = () => {
  return (
    <Wrapper>
      <Container>
        <HeroText>OUR CATEGORIES</HeroText>
        <HeroImage src={Image} />
      </Container>
      <CategoryTab />
    </Wrapper>
  );
};

export default AllProducts;
