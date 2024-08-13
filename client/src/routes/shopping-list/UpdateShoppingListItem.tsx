import React, {useState} from 'react';
import {Form} from 'react-router-dom';
import {styled} from 'styled-components';

const UpdateShoppingListItem = ({data, className}) => {
  const [item, setUpdates] = useState(data);

  return (
    <div className={className}>
      <Form method="post" className="item-update">
        <div className="controllers">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={item?.name}
            onChange={event => setUpdates({...item, name: event.target.value})}
            autoComplete="on"
            id="name"
          />
        </div>
        <div className="controllers">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={item?.quantity}
            onChange={event =>
              setUpdates({...item, quantity: event.target.value})
            }
            autoComplete="on"
            id="quantity"
          />
        </div>
        <div className="controllers">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            name="unit"
            value={item?.unit}
            onChange={event => setUpdates({...item, unit: event.target.value})}
            autoComplete="on"
            id="unit"
          />
        </div>
        <input type="hidden" name="id" defaultValue={item?.id} />
        <input type="hidden" name="action" defaultValue="update" />
        <button type="submit">Update</button>
      </Form>
      <Form method="post" className="item-delete">
        <input type="hidden" name="id" defaultValue={item?.id} />
        <input type="hidden" name="action" defaultValue="delete" />
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};

export const StyledUpdateShoppingListItem = styled(UpdateShoppingListItem)`
  display: flex;
  column-gap: 20px;

  .item-update {
    display: flex;
    column-gap: 15px;

    .controllers {
      display: flex;
      flex-direction: column;
      row-gap: 5px;

      input {
        border-radius: 10px;
        padding: 12px 10px;
        border: 2px solid #ebebeb;
        font-weight: 400;
        font-size: 15px;
      }
    }

    button {
      align-self: center;
      height: 32px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }

  .item-delete {
    display: flex;
    align-items: center;

    button {
      align-self: center;
      height: 32px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }
`;
