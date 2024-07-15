import React from 'react';
import {Link, Outlet, useLoaderData} from 'react-router-dom';

export const Dishes = () => {
  const loaderData = useLoaderData();

  return (
    <div>
      {loaderData.dishes ? (
        <div>{loaderData.dishes}</div>
      ) : (
        <div>No dishes in the list</div>
      )}
      <Link to={'add'}>Add new dish</Link>
      <Link to={'update'}>Update dish</Link>
      <Outlet />
    </div>
  );
};
