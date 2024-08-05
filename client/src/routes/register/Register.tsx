import React from 'react';
import {Form, Link} from 'react-router-dom';

export const Register = () => {
  return (
    <div>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'.'}>Register</Link>
        <Link to={'../login'}>Login</Link>
      </nav>
      <header>
        <h2>Register account</h2>
        <p>Enter your username and email to register the app</p>
      </header>
      <main>
        <Form method="post">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Your username" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Your email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      </main>
    </div>
  );
};
