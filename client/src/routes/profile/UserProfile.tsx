import React, {useEffect} from 'react';
import {useLoaderData, useNavigate, Outlet, Link} from 'react-router-dom';

import {useLoginState} from '../../hooks';

export const UserProfile = () => {
  // redirect works with loaders and actions
  const [storedValue, setValue] = useLoginState();
  const sessionData: unknown = useLoaderData();
  const navigate = useNavigate();

  // logout when session timeout
  useEffect(() => {
    if (sessionData.success) {
      setValue(false);
      navigate('/login');
    } else {
      console.log(sessionData);
    }
  }, [sessionData]);

  const logoutUser = async () => {
    try {
      const response = await fetch('/api/logout');
      const {success} = await response.json();

      if (success) {
        setValue(false);
        navigate('/login');
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      {sessionData.id && (
        <div>
          Hello, {sessionData.username}! Your id is {sessionData.id}, your email
          - {sessionData.email}
        </div>
      )}
      <button type="button" onClick={logoutUser}>
        Logout
      </button>
      <Link to={'update'}>Update</Link>
      <Outlet />
    </div>
  );
};
