import React from 'react';
import {Form} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  align-self: center;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const UpdateButton = styled.button`
  margin-top: 5%;
`;

const DeleteForm = styled(UpdateForm)`
  margin-top: 15%;
`;

export const UpdateUserProfile = () => {
  return (
    <Container>
      <UpdateForm method="post">
        <FormController>
          <label htmlFor="username">Username</label>
          <input name="username" placeholder="username" />
        </FormController>
        <FormController>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="email" />
        </FormController>
        <FormController>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" />
        </FormController>
        <input type="hidden" name="action" value="edit" />
        <UpdateButton type="submit">Change</UpdateButton>
      </UpdateForm>
      <DeleteForm method="post">
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete</button>
      </DeleteForm>
    </Container>
  );
};
