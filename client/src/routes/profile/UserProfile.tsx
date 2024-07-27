import React, {useEffect} from 'react';
import {useLoaderData, useNavigate, Outlet, Link} from 'react-router-dom';
import {useLoginState} from '../../hooks';

export const UserProfile = () => {
  const user: unknown = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  // logout when session timeout
  useEffect(() => user?.success && setValue(false), [user]);

  return (
    <div>
      {user?.id && (
        <div>
          Hello, {user.username}! Your id is {user.id}, your email -{user.email}
        </div>
      )}
      <Link to={'update'}>Update</Link>
      <Outlet />
    </div>
  );
};
