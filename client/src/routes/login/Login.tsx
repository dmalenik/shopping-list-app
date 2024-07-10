import React, {useEffect} from 'react';
import {useActionData, useNavigate, Form} from 'react-router-dom';

import {useLoginState} from '../../hooks';

export const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => {
    if (actionData) {
      setValue(true);
      navigate('/profile');
    }
  }, [actionData]);

  return (
    <div className="login">
      Hello from Login
      <Form method="post">
        <input name="username" placeholder="Enter name" />
        <input type="password" name="password" placeholder="Enter password" />
        <button type="submit">Log in</button>
      </Form>
    </div>
  );
};
