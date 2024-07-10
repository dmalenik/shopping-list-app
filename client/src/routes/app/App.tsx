import React from 'react';
import {Outlet, Link} from 'react-router-dom';

import {useLocalStorage} from '../../hooks';

import type {LoginState} from '../../types/app';

export function App() {
  const [storedValue, setValue] = useLocalStorage('loginStatus', false);

  return (
    <div className="App">
      <Link to={'home'}>Go home</Link>
      <Link to={'register'}>Register here</Link>
      <Link to={'login'}>Login here</Link>
      <Outlet context={[storedValue, setValue] satisfies LoginState} />
    </div>
  );
}
