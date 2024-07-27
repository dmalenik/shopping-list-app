import React from 'react';
import {Link} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

const Navigation = styled.nav`
  align-self: flex-end;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.1rem;
`;

const HomeLink = styled(Link)<{$isActive?: boolean}>`
  color: ${props => (props.$isActive ? 'red' : 'inherit')};
`;

const Menu = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Header = styled.header`
  align-self: center;
  margin-top: 3%;
`;

const Main = styled.main`
  align-self: center;
  margin-top: 9%;
`;

export const Home = () => {
  return (
    <Container>
      <Navigation>
        <HomeLink to={'./'} $isActive>
          Home
        </HomeLink>
        <Menu>
          <Link to={'register'}>Register</Link>
          <Link to={'login'}>Login</Link>
        </Menu>
      </Navigation>
      <Header>
        <h1>Home page!</h1>
      </Header>
      <Main>
        <p>Plan your shoppings here</p>
      </Main>
    </Container>
  );
};
