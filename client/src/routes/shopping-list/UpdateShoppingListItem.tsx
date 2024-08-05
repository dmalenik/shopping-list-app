import React, {useState} from 'react';
import {Form} from 'react-router-dom';

export const UpdateShoppingListItem = ({data}) => {
  const [item, setUpdates] = useState(data);

  return (
    <div>
      <Form method="post">
        <input
          type="text"
          name="name"
          value={item?.name}
          onChange={event => setUpdates({...item, name: event.target.value})}
        />
        <input
          type="text"
          name="quantity"
          value={item?.quantity}
          onChange={event =>
            setUpdates({...item, quantity: event.target.value})
          }
        />
        <input
          type="text"
          name="unit"
          value={item?.unit}
          onChange={event => setUpdates({...item, unit: event.target.value})}
        />
        <input type="hidden" name="id" defaultValue={item?.id} />
        <input type="hidden" name="action" defaultValue="update" />
        <button type="submit">Update</button>
      </Form>
      <Form method="post">
        <input type="hidden" name="id" defaultValue={item?.id} />
        <input type="hidden" name="action" defaultValue="delete" />
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};
