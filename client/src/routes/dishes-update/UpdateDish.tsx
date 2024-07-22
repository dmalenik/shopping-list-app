import React from 'react';
import {Form, useOutletContext} from 'react-router-dom';

export const UpdateDish = () => {
  const [updates, setUpdates] = useOutletContext();

  return (
    <div>
      <Form method="post">
        <input
          name="dishname"
          placeholder="new dish name"
          defaultValue={updates?.dish}
          onChange={Event => setUpdates({...updates, dish: Event.target.value})}
        />
        Components:
        {updates?.components.map((c, i) => {
          const {name, unit, size, id} = c;

          return (
            <div key={id}>
              <fieldset>
                <input
                  name="name"
                  placeholder="name"
                  defaultValue={name}
                  onChange={Event =>
                    setUpdates({
                      ...updates,
                      components: updates.components.toSpliced(i, 1, {
                        ...c,
                        name: Event.target.value,
                      }),
                    })
                  }
                />
                <input
                  name="unit"
                  placeholder="unit"
                  defaultValue={unit}
                  onChange={Event =>
                    setUpdates({
                      ...updates,
                      components: updates.components.toSpliced(i, 1, {
                        ...c,
                        unit: Event.target.value,
                      }),
                    })
                  }
                />
                <input
                  name="size"
                  placeholder="size"
                  defaultValue={size}
                  onChange={Event =>
                    setUpdates({
                      ...updates,
                      components: updates.components.toSpliced(i, 1, {
                        ...c,
                        size: Event.target.value,
                      }),
                    })
                  }
                />
                <input type="hidden" name="id" defaultValue={id} />
              </fieldset>
              <button
                type="button"
                onClick={() =>
                  setUpdates({
                    ...updates,
                    components: updates.components.filter(
                      (c: unknown) => c.id !== id
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
              components: [
                ...updates.components,
                {
                  name: '',
                  unit: '',
                  size: '',
                  id: crypto.randomUUID(),
                },
              ],
            })
          }
        >
          Add another ingredient
        </button>
        <input type="hidden" name="dishid" value={updates?.id} />
        <input type="hidden" name="action" value="edit" />
        <button type="submit">Update dish</button>
      </Form>
      <Form method="post">
        <input type="hidden" name="id" value={updates?.id} />
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete dish</button>
      </Form>
    </div>
  );
};
