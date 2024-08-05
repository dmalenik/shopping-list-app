import React, {useEffect} from 'react';
import {useActionData, useNavigate, Form, Link} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const Login = () => {
  const login = useActionData();
  const navigate = useNavigate();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => {
    if (login) {
      setValue(true);
      navigate('../home');
    }
  }, [login]);

  return (
    <div>
      <nav>
        <Link to={'/'}>Main</Link>
        <Link to={'../register'}>Register</Link>
        <Link to={'.'}>Login</Link>
      </nav>
      <header>
        <h2>Login</h2>
        <p>Enter your username and password to login the app</p>
      </header>
      <main>
        <Form method="post">
          <div>
            <label htmlFor="username">Username</label>
            <input name="username" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </main>
    </div>
  );
};
