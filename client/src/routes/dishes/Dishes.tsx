import React from 'react';
import {Link, Outlet, useLoaderData} from 'react-router-dom';

export const Dishes = () => {
  const dishes: any = useLoaderData();

  return (
    <div>
      {dishes && !dishes.success ? (
        dishes.map(({id, dish}) => (
          <Link key={id} to={`./${id}`}>
            {dish}
          </Link>
        ))
      ) : (
        <div>No dishes in the list</div>
      )}
      <Link to={'add'}>Add new dish</Link>
      <Outlet />
    </div>
  );
};
