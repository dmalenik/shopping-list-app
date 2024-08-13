import React from 'react';
import {Form} from 'react-router-dom';
import {StyledNavigation} from '../../shared/components';
import {navigationData} from '../../shared/data';
import {styled} from 'styled-components';

const Register = ({className}) => {
  return (
    <div className={className}>
      <StyledNavigation
        menu={navigationData}
        active="register"
        className="nav"
      />
      <header>
        <h2>Register account</h2>
        <p>Enter your username and email to register your profile</p>
      </header>
      <main>
        <Form method="post">
          <div className="controller">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Your username"
              autoComplete="on"
              id="username"
            />
          </div>
          <div className="controller">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Your email"
              autoComplete="on"
              id="email"
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
          <button type="submit">Register</button>
        </Form>
      </main>
    </div>
  );
};

export const StyledRegister = styled(Register)`
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
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;

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
  }
`;
