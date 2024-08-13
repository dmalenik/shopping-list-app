import React, {useEffect} from 'react';
import {Navigate, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const Logout = () => {
  const logout = useLoaderData() as {logout: boolean};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLoginState();

  useEffect(() => {
    if (logout?.logout) {
      setValue(false);
    }
  }, [logout]);

  return <Navigate to={'../login'} replace={true} />;
};
