import React, {useEffect} from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';

import {useLoginState} from '../../hooks';

export const UserProfile = () => {
  // redirect works with loaders and actions
  const navigate = useNavigate();
  const [storedValue, setValue] = useLoginState();
  const sessionData: unknown = useLoaderData();

  // logout when session timeout
  useEffect(() => {
    if (sessionData.success) {
      setValue(false);
      navigate('/login');
    }
  }, [sessionData]);

  const logoutUser = async () => {
    try {
      const response = await fetch('/api/logout');
      const {success} = await response.json();

      if (success) {
        setValue(false);
        navigate('/home');
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
    </div>
  );
};
