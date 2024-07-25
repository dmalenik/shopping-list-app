import React, {useState} from 'react';
import {Outlet, useLoaderData, useNavigate} from 'react-router-dom';

export const Dish = () => {
  const dish = useLoaderData();
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<typeof dish | undefined>();

  return dish && !dish.success ? (
    <div id={dish?.id}>
      <div>{dish?.dish}</div>
      {dish?.components.map(c => (
        <div key={c.id}>
          <div>{c.name}</div>
          <div>{c.unit}</div>
          <div>{c.size}</div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setUpdates(dish);
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
