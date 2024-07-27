import React, {useEffect} from 'react';
import {Link, Outlet, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const Dishes = () => {
  const dishes: unknown = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => dishes?.success && setValue(false), [dishes]);

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
