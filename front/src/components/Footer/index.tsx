import { FooterContainer } from './styles';

function Footer() {
  return (
    <FooterContainer>
      <p>Data Canary - {new Date().getFullYear()}</p>
    </FooterContainer>
  );
}

export default Footer;
