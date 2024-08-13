import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const RequireAuth = () => {
  const [storedValue, setValue] = useLoginState();

  return storedValue === false ? (
    <Navigate to={'../login'} replace={true} />
  ) : (
    <Outlet context={[storedValue, setValue]} />
  );
};
