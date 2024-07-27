import React from 'react';
import {Outlet, Navigate, Link} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const RequireAuth = () => {
  const [storedValue, setValue] = useLoginState();

  return storedValue === false ? (
    <Navigate to={'login'} replace={true} />
  ) : (
    <div>
      <Link to={'profile'}>Profile</Link>
      <Link to={'dishes'}>Dishes</Link>
      <Link to={'lists'}>Lists</Link>
      <Link to={'logout'}>Logout</Link>
      <Outlet context={[storedValue, setValue]} />
    </div>
  );
};
