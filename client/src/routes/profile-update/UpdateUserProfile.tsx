import React from 'react';
import {Form, useActionData} from 'react-router-dom';

export const UpdateUserProfile = () => {
  const actionData = useActionData();
  console.log('actionData', actionData);
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
