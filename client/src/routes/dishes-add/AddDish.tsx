import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';

export const AddDish = () => {
  const [count, setCount] = useState(1);
  const actionData = useActionData();

  return (
    <div>
      <Form method="post">
        <input name="dish" placeholder="Dish" />
        Components:
        {[...Array(count)].map((v, i) => (
          <fieldset key={i}>
            <input name="name" placeholder="name" />
            <input name="unit" placeholder="unit" />
            <input name="size" placeholder="size" />
          </fieldset>
        ))}
        <button type="button" onClick={() => setCount(count + 1)}>
          +
        </button>
        <button type="submit">Add dish to list</button>
      </Form>
      {actionData?.success && <div>This dish already exists in the list</div>}
    </div>
  );
};
