import React, {useState} from 'react';
import {Form} from 'react-router-dom';

export const UpdateDish = ({update, data}) => {
  const [updates, setUpdates] = useState(data);

  return (
    <div>
      <Form method="post" onSubmit={() => update()}>
        <div>
          <label htmlFor="dishname">Dish name</label>
          <input
            name="dishname"
            placeholder="Dish name"
            defaultValue={updates?.name}
            id="dishname"
          />
        </div>
        Components:
        {updates?.ingridients?.map(({id, name, quantity, unit}) => {
          return (
            <div key={id}>
              <fieldset>
                <input
                  name="name"
                  placeholder="name"
                  defaultValue={name}
                  id="name"
                />
                <input
                  name="quantity"
                  placeholder="quantity"
                  defaultValue={quantity}
                />
                <input name="unit" placeholder="unit" defaultValue={unit} />
                <input type="hidden" name="id" id="id" defaultValue={id} />
              </fieldset>
              <button
                type="button"
                onClick={() =>
                  setUpdates({
                    ...updates,
                    ingridients: updates.ingridients.filter(
                        (ing: {
                          id: string;
                          name: string;
                          quantity: string;
                          unit: string;
                        }) => ing.id !== id
                    ),
                  })
                }
              >
                -
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() =>
            setUpdates({
              ...updates,
              ingridients: [
                ...updates.ingridients,
                {
                  id: crypto.randomUUID(),
                  name: null,
                  quantity: null,
                  unit: null,
                },
              ],
            })
          }
        >
          Add another ingredient
        </button>
        <input type="hidden" name="dishid" id="dishid" value={updates?.id} />
        <input type="hidden" name="action" id="action" value="edit" />
        <button type="submit">Update dish</button>
      </Form>
      <Form method="post" onSubmit={() => update()}>
        <input type="hidden" name="id" id="id" value={updates?.id} />
        <input type="hidden" name="action" id="id" value="delete" />
        <button type="submit">Delete dish</button>
      </Form>
    </div>
  );
};
