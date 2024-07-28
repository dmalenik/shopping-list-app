import React from 'react';
import {Form, useOutletContext} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
`;

const UpdateDishForm = styled(Form)`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const DeleteDishForm = styled(Form)`
  margin-top: 3%;
`;

export const UpdateDish = () => {
  const [updates, setUpdates] = useOutletContext();

  return (
    <Container>
      <UpdateDishForm method="post">
        <FormController>
          <label htmlFor="dishname">Dish name</label>
          <input
            name="dishname"
            placeholder="Dish name"
            defaultValue={updates?.dish}
            onChange={Event =>
              setUpdates({...updates, dish: Event.target.value})
            }
          />
        </FormController>
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
      </UpdateDishForm>
      <DeleteDishForm method="post">
        <input type="hidden" name="id" value={updates?.id} />
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete dish</button>
      </DeleteDishForm>
    </Container>
  );
};
