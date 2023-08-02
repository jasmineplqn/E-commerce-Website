import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Company from "./pages/Company";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import AboutPage from "./pages/AboutPage";
import Confirmation from "./pages/Confirmation";

//list of all our routes
function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:company" element={<Company />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts/:itemId" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
