import React, {useState} from 'react';
import {Form} from 'react-router-dom';
import {styled} from 'styled-components';

const UpdateDish = ({update, data, className}) => {
  const [updates, setUpdates] = useState(data);

  return (
    <div className={className}>
      <Form method="post" onSubmit={() => update()} className="dish-update">
        <div className="dish-name">
          <label htmlFor="dishname">Dish name</label>
          <input
            name="dishname"
            placeholder="Dish name"
            defaultValue={updates?.name}
            id="dishname"
            autoComplete="off"
          />
        </div>
        <div className="ingridients">
          <h4>Ingridients</h4>
          {updates?.ingridients?.map(({id, name, quantity, unit}) => {
            return (
              <div key={id} className="ingridient">
                <fieldset className="fields">
                  <div className="controllers">
                    <label htmlFor={`name-${id}`}>Name</label>
                    <input
                      name="name"
                      placeholder="Name"
                      defaultValue={name}
                      id={`name-${id}`}
                      autoComplete="off"
                    />
                  </div>
                  <div className="controllers">
                    <label htmlFor={`quantity-${id}`}>Quantity</label>
                    <input
                      name="quantity"
                      placeholder="Quantity"
                      defaultValue={quantity}
                      id={`quantity-${id}`}
                      autoComplete="off"
                    />
                  </div>
                  <div className="controllers">
                    <label htmlFor={`unit-${id}`}>Unit</label>
                    <input
                      name="unit"
                      placeholder="unit"
                      defaultValue={unit}
                      id={`unit-${id}`}
                      autoComplete="off"
                    />
                  </div>
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
                  className="dish-btn-remove"
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
            className="dish-btn-add"
          >
            +Ingridient
          </button>
        </div>
        <input type="hidden" name="dishid" id="dishid" value={updates?.id} />
        <input type="hidden" name="action" id="action" value="edit" />
        <button type="submit" className="dish-btn-update">
          Update dish
        </button>
      </Form>
      <Form method="post" onSubmit={() => update()} className="dish-delete">
        <input type="hidden" name="id" value={updates?.id} />
        <input type="hidden" name="dishname" value={updates?.name} />
        <input type="hidden" name="action" value="delete" />
        <button type="submit">Delete dish</button>
      </Form>
    </div>
  );
};

export const StyledUpdateDish = styled(UpdateDish)`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  align-items: center;

  .dish-update {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
    margin-top: 35px;

    .dish-name {
      display: flex;
      flex-direction: column;
      row-gap: 5px;

      label {
        align-self: start;
        font-weight: bold;
      }

      input {
        height: 54px;
        border-radius: 10px;
        border: 2px solid #ebebeb;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        width: 100%;
        padding: 16px 14px;
      }
    }

    .ingridients {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      align-items: center;
      padding: 3% 3% auto;

      h4 {
        margin: 0;
        align-self: flex-start;
      }

      .ingridient {
        display: flex;

        .fields {
          display: flex;
          border-style: none;
          column-gap: 10px;
          padding: 0;

          .controllers {
            display: flex;
            flex-direction: column;
            row-gap: 5px;

            label {
              align-self: start;
            }

            input {
              height: 54px;
              border-radius: 10px;
              border: 2px solid #ebebeb;
              font-weight: 400;
              font-size: 15px;
              line-height: 20px;
              width: 100%;
              padding: 16px 14px;
            }
          }
        }

        .dish-btn-remove {
          align-self: center;
          margin-top: 3%;
          margin-left: 10px;
          border-radius: 5px;
          border: 2px solid #ebebeb;
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          background-color: #151924;
          color: #ffffff;
        }
      }

      .dish-btn-add {
        width: 100px;
        height: 32px;
        border-radius: 12px;
        background-color: #151924;
        color: #ffffff;
        font-weight: 700;
        font-size: 17px;
      }
    }

    .dish-btn-update {
      height: 54px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }

  .dish-delete {
    margin-top: 35px;

    button {
      height: 54px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }
`;
