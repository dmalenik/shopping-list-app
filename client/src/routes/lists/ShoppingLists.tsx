import React, {useEffect} from 'react';
import {Outlet, useLoaderData, Link} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const ShoppingLists = () => {
  const lists: unknown = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => lists?.success && setValue(false), [lists]);

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
