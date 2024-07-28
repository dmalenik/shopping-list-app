import React from 'react';
import {Form, Link} from 'react-router-dom';
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

const Menu = styled.div`
  display: flex;
  column-gap: 10px;
`;

const RegistrationLink = styled(Link)<{$isActive?: boolean}>`
  color: ${props => (props.$isActive ? 'red' : 'inherit')};
`;

const Header = styled.header`
  align-self: center;
  margin-top: 3%;
`;

const Main = styled.main`
  align-self: center;
  width: 100%;
`;

const RegistrationForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 20%;
  margin: 1% auto auto;
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const FormButton = styled.button`
  margin-top: 15px;
`;

export const Register = () => {
  return (
    <Container>
      <Navigation>
        <Link to={'/'}>Home</Link>
        <Menu>
          <RegistrationLink to={'.'} $isActive>
            Register
          </RegistrationLink>
          <Link to={'../login'}>Login</Link>
        </Menu>
      </Navigation>
      <Header>
        <h2>Register account!</h2>
      </Header>
      <Main>
        <RegistrationForm method="post">
          <FormController>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Your username" />
          </FormController>
          <FormController>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Your email" />
          </FormController>
          <FormController>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
          </FormController>
          <FormButton type="submit">Register</FormButton>
        </RegistrationForm>
      </Main>
    </Container>
  );
};
