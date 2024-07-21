import React from 'react';
import {Outlet, useLoaderData, Link} from 'react-router-dom';

export const ShoppingLists = () => {
  const loaderData = useLoaderData();

  return (
    <div>
      {loaderData ? (
        <div>
          {loaderData.map((l, i) => (
            <div key={i}>{l.id}</div>
          ))}
        </div>
      ) : (
        <div>No lists for now</div>
      )}
      <Link to={'add'}>Add new shopping list</Link>
      <Outlet />
    </div>
  );
};
