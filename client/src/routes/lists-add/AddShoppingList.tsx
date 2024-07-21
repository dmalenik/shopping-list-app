import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';

export const AddShoppingList = () => {
  const [idArr, setIdArr] = useState([crypto.randomUUID()]);
  const actionData = useActionData();

  return (
    <div>
      <Form method="post">
        <input placeholder="title" name="title" />
        Elements:
        {idArr.map(id => {
          return (
            <fieldset key={id}>
              <input placeholder="item" name="item" />
              <input placeholder="measure" name="measure" />
              <input placeholder="unit" name="unit" />
            </fieldset>
          );
        })}
        <button
          type="button"
          onClick={() => setIdArr(arr => [...arr, crypto.randomUUID()])}
        >
          +
        </button>
        <button type="submit">Add list</button>
      </Form>
    </div>
  );
};
