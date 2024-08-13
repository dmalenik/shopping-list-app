import React from 'react';
import {Form} from 'react-router-dom';
import {styled} from 'styled-components';

export const UpdateUser = ({data, update, className}) => {
  return (
    <section className={className}>
      <Form method="post" onSubmit={() => update()} className="user-update">
        <div className="controller">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="username"
            defaultValue={data?.username}
            autoComplete="on"
            id="username"
          />
        </div>
        <div className="controller">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="email"
            defaultValue={data?.email}
            autoComplete="on"
            id="email"
          />
        </div>
        <div className="controller">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="on"
            id="password"
          />
        </div>
        <input type="hidden" name="action" defaultValue="edit" />
        <input type="hidden" name="current" defaultValue={data?.username} />
        <button type="submit" className="btn">
          Update
        </button>
      </Form>
      <Form method="post" onSubmit={() => update()} className="user-delete">
        <input type="hidden" name="action" defaultValue="delete" />
        <button type="submit" className="btn">
          Delete
        </button>
      </Form>
    </section>
  );
};

export const StyledUpdateUser = styled(UpdateUser)`
  display: flex;
  flex-direction: column;
  row-gap: 25px;

  .user-update {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .controller {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      align-items: center;

      label {
        align-self: start;
      }

      input {
        width: 100%;
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
      align-self: center;
      margin-top: 10px;
      height: 54px;
      border-radius: 12px;
      padding: 17px 120px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }

  button {
    margin-top: 10px;
    height: 54px;
    border-radius: 12px;
    padding: 17px 120px;
    background-color: #151924;
    color: #ffffff;
    font-weight: 700;
    font-size: 17px;
  }
`;
