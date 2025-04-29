import { HeaderContainer, Logo, Nav, NavLink } from './styles';

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>Canary Data</Logo>
      <Nav>
        <NavLink href="#">Home</NavLink>
      </Nav>
    </HeaderContainer>
  );
}
