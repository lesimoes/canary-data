import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  .diff_delete {
    color: black;
    background-color: rgb(246, 172, 185);
    border-radius: 0.2rem;     
    border: 0.01rem solid gray;
  }

  .diff_insert {
    color: black;
    background-color: rgb(176, 243, 174);
    border-radius: 0.2rem;     
    border: 0.01rem solid gray;
  }
`;