import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

const AddDishForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 20%;
  margin: 1% auto auto;
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const FieldsetController = styled.fieldset`
  display: flex;
  align-self: center;
  border-style: none;
`;

export const AddDish = () => {
  const [keys, setKeys] = useState([crypto.randomUUID()]);
  const actionData = useActionData();

  return (
    <Container>
      <AddDishForm method="post">
        <FormController>
          <label htmlFor="name">Name</label>
          <input name="name" placeholder="Dish" />
        </FormController>
        <FormController>
          Components:
          {keys.map(k => (
            <FieldsetController key={k}>
              <FormController>
                <label htmlFor="name">Name</label>
                <input name="name" placeholder="name" />
              </FormController>
              <FormController>
                <label htmlFor="unit">Unit</label>
                <input name="unit" placeholder="unit" />
              </FormController>
              <FormController>
                <label htmlFor="size">Size</label>
                <input name="size" placeholder="size" />
              </FormController>
              <input name="id" defaultValue={k} type="hidden" />
            </FieldsetController>
          ))}
          <button
            type="button"
            onClick={() => setKeys(k => [...k, crypto.randomUUID()])}
          >
            +
          </button>
        </FormController>
        <button type="submit">Add dish to list</button>
      </AddDishForm>
      {actionData?.success && <div>This dish already exists in the list</div>}
    </Container>
  );
};
