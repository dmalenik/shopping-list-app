import React, {useState} from 'react';
import {Form, useActionData} from 'react-router-dom';

export const AddDish = () => {
  const [count, setCount] = useState(1);
  const actionData = useActionData();

  const handleAddNewIngredient = () => setCount(count + 1);

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
            <button type="button" onClick={handleAddNewIngredient}>
              +
            </button>
          </fieldset>
        ))}
        <button type="submit">Add dish to list</button>
      </Form>
      {!actionData && <div>This dish already exists in the list</div>}
    </div>
  );
};
