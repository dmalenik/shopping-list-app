import React from 'react';
import {Outlet} from 'react-router-dom';
import {useLocalStorage} from '../../hooks';

import type {LoginState} from '../../shared/types';

export function App() {
  const [storedValue, setValue] = useLocalStorage('loginStatus', false);

  return (
    <div className="app">
      <Outlet context={[storedValue, setValue] satisfies LoginState} />
    </div>
  );
}
