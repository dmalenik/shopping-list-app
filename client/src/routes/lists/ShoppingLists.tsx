import React from 'react';
import {Outlet, useLoaderData, Link} from 'react-router-dom';

export const ShoppingLists = () => {
  const lists: any = useLoaderData();

  return (
    <div>
      {lists && !lists.success ? (
        lists.map(({id, name}) => (
          <Link key={id} to={`./${id}`}>
            {name}
          </Link>
        ))
      ) : (
        <div>No shopping lists</div>
      )}
      <Link to={'add'}>Add new shopping list</Link>
      <Outlet />
    </div>
  );
};
