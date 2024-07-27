import React, {useEffect} from 'react';
import {useActionData, useNavigate, Form, Link} from 'react-router-dom';
import {styled} from 'styled-components';

import {useLoginState} from '../../hooks';

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

const LoginLink = styled(Link)<{$isActive?: boolean}>`
  color: ${props => (props.$isActive ? 'red' : 'inherit')};
`;

const Header = styled.header`
  align-self: center;
  margin-top: 3%;
`;

const LoginForm = styled(Form)`
  margin-top: 1%;
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 20%;
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const FormButton = styled.button`
  margin-top: 15px;
`;

export const Login = () => {
  const login = useActionData();
  const navigate = useNavigate();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => {
    if (login) {
      setValue(true);
      navigate('/profile');
    }
  }, [login]);

  return (
    <Container>
      <Navigation>
        <Link to={'/'}>Home</Link>
        <Menu>
          <Link to={'../register'}>Register</Link>
          <LoginLink to={'.'} $isActive>
            Login
          </LoginLink>
        </Menu>
      </Navigation>
      <Header>
        <h2>Login!</h2>
      </Header>
      <LoginForm method="post">
        <FormController>
          <label htmlFor="username">Username</label>
          <input name="username" placeholder="Your name" />
        </FormController>
        <FormController>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Your password" />
        </FormController>
        <FormButton type="submit">Login</FormButton>
      </LoginForm>
    </Container>
  );
};
