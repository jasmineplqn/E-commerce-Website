import React from "react";
import Load from "../assets/images/spinner.gif";
import { styled } from "styled-components";

//for loading purposes
const Loading = () => {
  return <Loader src={Load} />;
};

const Loader = styled.img`
  width: 400px;
  scale: 0.3;
  object-fit: cover;
  filter: brightness(130%);
`;
export default Loading;
