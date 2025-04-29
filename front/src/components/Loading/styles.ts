import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: purple;
  height: 10vh;
`;

export const Dot = styled.span`
  animation: ${blink} 1.4s infinite both;
  margin: 0 0.2rem;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;