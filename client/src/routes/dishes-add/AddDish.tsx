import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';

export const AddDish = () => {
  const [keys, setKeys] = useState([crypto.randomUUID()]);
  const actionData = useActionData();

  return (
    <div>
      <Form method="post">
        <input name="name" placeholder="Dish" />
        Components:
        {keys.map(k => (
          <fieldset key={k}>
            <input name="name" placeholder="name" />
            <input name="unit" placeholder="unit" />
            <input name="size" placeholder="size" />
            <input name="id" defaultValue={k} type="hidden" />
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() => setKeys(k => [...k, crypto.randomUUID()])}
        >
          +
        </button>
        <button type="submit">Add dish to list</button>
      </Form>
      {actionData?.success && <div>This dish already exists in the list</div>}
    </div>
  );
};
