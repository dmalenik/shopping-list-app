import React from 'react';
import {Form, Link} from 'react-router-dom';

export const Register = () => {
  return (
    <div className="register">
      <Link to={'/'}>Home</Link>
      Hello from Register
      <Form method="post">
        <input type="text" name="username" placeholder="Enter username" />
        <input type="text" name="email" placeholder="Enter email" />
        <input type="password" name="password" placeholder="Enter password" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
