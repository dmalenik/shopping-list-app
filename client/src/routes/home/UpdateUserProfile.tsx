import React from 'react';
import {Form} from 'react-router-dom';

export const UpdateUser = ({data, update}) => {
  return (
    <div>
      <Form method="post" onSubmit={() => update()}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="username"
            defaultValue={data?.username}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="email" defaultValue={data?.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" />
        </div>
        <input type="hidden" name="action" defaultValue="edit" />
        <input type="hidden" name="current" defaultValue={data?.username} />
        <button type="submit">Change</button>
      </Form>
      <Form method="post" onSubmit={() => update()}>
        <input type="hidden" name="action" defaultValue="delete" />
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};
