import React from 'react';
import {useOutletContext, Form} from 'react-router-dom';

export const UpdateShoppingList = () => {
  const [updates, setUpdates] = useOutletContext();

  return (
    <div>
      <Form method="post">
        <input
          name="name"
          placeholder="new list name"
          defaultValue={updates?.name}
          onChange={Event => setUpdates({...updates, name: Event.target.value})}
        />
        Elements:
        {updates?.elements.map((e, i) => {
          const {id, item, measure, unit} = e;

          return (
            <div key={id}>
              <fieldset>
                <input
                  name="item"
                  placeholder="name"
                  defaultValue={item}
                  onChange={Event =>
                    setUpdates({
                      ...updates,
                      elements: updates.elements.toSpliced(i, 1, {
                        ...e,
                        item: Event.target.value,
                      }),
                    })
                  }
                />
                <input
                  name="measure"
                  placeholder="measure"
                  defaultValue={measure}
                  onChange={Event =>
                    setUpdates({
                      ...updates,
                      elements: updates.elements.toSpliced(i, 1, {
                        ...e,
                        measure: Event.target.value,
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
                      elements: updates.elements.toSpliced(i, 1, {
                        ...e,
                        unit: Event.target.value,
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
                    elements: updates.elements.filter(
                      (e: unknown) => e.id !== id
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
              elements: [
                ...updates.elements,
                {
                  item: '',
                  measure: '',
                  unit: '',
                  id: crypto.randomUUID(),
                },
              ],
            })
          }
        >
          Add another item
        </button>
        <input type="hidden" name="id" defaultValue={updates?.id} />
        <input type="hidden" name="action" defaultValue="edit" />
        <button type="submit">Update list</button>
      </Form>
      <Form method="post">
        <input type="hidden" name="id" defaultValue={updates?.id} />
        <input type="hidden" name="action" defaultValue="delete" />
        <button type="submit">Delete list</button>
      </Form>
    </div>
  );
};
