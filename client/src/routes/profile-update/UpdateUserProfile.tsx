import React from 'react';
import {Form} from 'react-router-dom';

export const UpdateUserProfile = () => {
  return (
    <div>
      <Form method="post">
        <input name="username" placeholder="username" />
        <input name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="hidden" name="action" value="edit" />
        <button type="submit">Change</button>
      </Form>
      <Form method="post">
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};
