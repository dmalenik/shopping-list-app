import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';

export const AddShoppingList = () => {
  const [keys, setKeys] = useState([crypto.randomUUID()]);
  const actionData = useActionData();

  return (
    <div>
      <Form method="post">
        <input placeholder="title" name="title" />
        Elements:
        {keys.map(k => {
          return (
            <fieldset key={k}>
              <input placeholder="item" name="item" />
              <input placeholder="measure" name="measure" />
              <input placeholder="unit" name="unit" />
              <input type="hidden" name="id" defaultValue={k} />
            </fieldset>
          );
        })}
        <button
          type="button"
          onClick={() => setKeys(k => [...k, crypto.randomUUID()])}
        >
          +
        </button>
        <button type="submit">Add list</button>
      </Form>
    </div>
  );
};
