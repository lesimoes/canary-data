import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 8vh;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: #111;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;