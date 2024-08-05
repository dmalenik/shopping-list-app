import React, {useState} from 'react';
import {Form} from 'react-router-dom';

export const AddShoppingListItem = ({add}) => {
  const [form, setForm] = useState({name: '', quantity: '', unit: ''});

  return (
    <div>
      <Form method="post" onSubmit={() => add()}>
        <input
          placeholder="name"
          name="name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input
          placeholder="quantity"
          name="quantity"
          value={form.quantity}
          onChange={e => setForm({...form, quantity: e.target.value})}
        />
        <input
          placeholder="unit"
          name="unit"
          value={form.unit}
          onChange={e => setForm({...form, unit: e.target.value})}
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
