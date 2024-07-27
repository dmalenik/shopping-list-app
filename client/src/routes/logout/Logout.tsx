import React, {useEffect} from 'react';
import {Navigate, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const Logout = () => {
  const logout = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => logout?.success && setValue(false), [logout]);

  return <Navigate to={'../login'} replace={true} />;
};
