import React, {useState} from 'react';
import {Form} from 'react-router-dom';

export const UpdateDish = () => {
  const [count, setCount] = useState(1);

  const handleUpdateIngredient = () => setCount(count + 1);

  return (
    <div>
      <Form method="post">
        <input name="querydish" placeholder="dish name to change" />
        <input name="newdishname" placeholder="new dish name" />
        Components:
        {[...Array(count)].map((v, i) => (
          <fieldset key={i}>
            <input name="name" placeholder="name" />
            <input name="unit" placeholder="unit" />
            <input name="size" placeholder="size" />
            <button type="button" onClick={handleUpdateIngredient}>
              Update another ingredient
            </button>
          </fieldset>
        ))}
        <input type="hidden" name="action" value="edit" />
        <button type="submit">Update dish</button>
      </Form>
      <Form method="post">
        <input name="querydish" placeholder="dish name to delete" />
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete dish</button>
      </Form>
    </div>
  );
};
