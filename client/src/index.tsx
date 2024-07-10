import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {App} from './routes/app';
import {Register, registerAction} from './routes/register';
import {Login, LoginError, loginAction} from './routes/login';
import {RequireAuth} from './routes/require-auth';
import {UserProfile, userProfileLoader} from './routes/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <div>Home is where you are!</div>,
        index: true,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <LoginError />,
        action: loginAction,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'profile',
            element: <UserProfile />,
            loader: userProfileLoader,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
