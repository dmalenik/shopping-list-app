import React, {useState} from 'react';
import {Form} from 'react-router-dom';
import {styled} from 'styled-components';

const AddShoppingListItem = ({add, className}) => {
  const [form, setForm] = useState({name: '', quantity: '', unit: ''});

  return (
    <div className={className}>
      <Form method="post" onSubmit={() => add()}>
        <div className="controllers">
          <label htmlFor="name">Name</label>
          <input
            placeholder="name"
            name="name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            id="name"
            autoComplete="on"
          />
        </div>
        <div className="controllers">
          <label htmlFor="quantity">Quantity</label>
          <input
            placeholder="quantity"
            name="quantity"
            value={form.quantity}
            onChange={e => setForm({...form, quantity: e.target.value})}
            id="quantity"
            autoComplete="on"
          />
        </div>
        <div className="controllers">
          <label htmlFor="unit">Unit</label>
          <input
            placeholder="unit"
            name="unit"
            value={form.unit}
            onChange={e => setForm({...form, unit: e.target.value})}
            id="controllers"
            autoComplete="on"
          />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export const StyledAddShoppingListItem = styled(AddShoppingListItem)`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    column-gap: 15px;
    align-items: center;

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
      height: 32px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
    }
  }
`;
