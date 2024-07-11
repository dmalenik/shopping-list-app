import React from 'react';
import {Form} from 'react-router-dom';

export const UpdateUserProfile = () => {
  return (
    <Form method="post">
      <input name="username" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="password" />
      <input type="hidden" name="action" value="edit" />
      <button type="submit">Change data</button>
    </Form>
  );
};
