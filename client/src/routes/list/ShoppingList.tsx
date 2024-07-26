import React, {useState} from 'react';
import {Outlet, useLoaderData, useNavigate} from 'react-router-dom';

export const ShoppingList = () => {
  const list = useLoaderData();
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<typeof list | undefined>();

  return list && !list.success ? (
    <div id={list?.id}>
      <div>{list?.name}</div>
      {list?.elements.map(e => (
        <div key={e.id}>
          <div>{e.item}</div>
          <div>{e.measure}</div>
          <div>{e.unit}</div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setUpdates(list);
          navigate('update');
        }}
      >
        Update
      </button>
      <Outlet context={[updates, setUpdates]} />
    </div>
  ) : (
    <div>Empty</div>
  );
};
