import React, {useEffect} from 'react';
import {useActionData, useNavigate, Form} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {StyledNavigation} from '../../shared/components';
import {navigationData} from '../../shared/data';
import {styled} from 'styled-components';

export const Login = ({className}) => {
  const login = useActionData() as {login: boolean};
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLoginState();

  useEffect(() => {
    if (login?.login) {
      setValue(true);
      navigate('../home');
    }
  }, [login]);

  return (
    <div className={className}>
      <StyledNavigation menu={navigationData} active="login" className="nav" />
      <header>
        <h2>Login</h2>
        <p>Enter your username and password to login the app</p>
      </header>
      <main>
        <Form method="post">
          <div className="controller">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              placeholder="Your name"
              autoComplete="on"
              id="username"
            />
          </div>
          <div className="controller">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="on"
              id="password"
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </main>
    </div>
  );
};

export const StyledLogin = styled(Login)`
  display: flex;
  flex-direction: column;

  header {
    align-self: center;
    text-align: center;
    margin-top: 80px;

    h2,
    p {
      margin: 0;
    }

    h2 {
      font-weight: 700;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.36px;
    }

    p {
      margin-top: 10px;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.24px;
    }
  }

  main {
    align-self: center;
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: center;

    form {
      width: 60%;
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .controller {
        display: flex;
        flex-direction: column;
        row-gap: 7px;

        label {
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          letter-spacing: -0.24px;
        }

        input {
          height: 54px;
          border-radius: 10px;
          padding: 16px 14px;
          border: 2px solid #ebebeb;
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
        }
      }
    }

    button {
      margin-top: 25px;
      height: 54px;
      border-radius: 12px;
      padding: 17px 120px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }
`;
