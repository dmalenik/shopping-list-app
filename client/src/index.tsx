import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {App} from './routes/app';
import {Register, registerAction} from './routes/register';
import {Login, LoginError, loginAction} from './routes/login';
import {RequireAuth} from './routes/require-auth';
import {Home, homeLoader, homeAction} from './routes/home';
import {AddDish, addDishAction} from './routes/dish-add';
import {Logout, logoutLoader} from './routes/logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Home />,
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
            path: 'home',
            element: <Home />,
            loader: homeLoader,
            action: homeAction,
          },
          {
            path: 'home/dish/add',
                element: <AddDish />,
                action: addDishAction,
            loader: async () => await fetch('/api/home/dish/add'),
          },
          {
            path: 'dishes/:id',
            loader: dishLoader,
            element: <Dish />,
            children: [
              {
                path: 'update',
                element: <UpdateDish />,
                action: updateDishAction,
              },
            ],
          },
          {
            path: 'lists',
            element: <ShoppingLists />,
            loader: shoppingListsLoader,
            children: [
              {
                path: ':id',
                loader: shoppingListLoader,
                element: <ShoppingList />,
                children: [
                  {
                    path: 'update',
                    element: <UpdateShoppingList />,
                    action: updateShoppingListAction,
                  },
                ],
              },
              {
                path: 'add',
                element: <AddShoppingList />,
                action: addShoppingListAction,
              },
            ],
          },
          {
            path: 'logout',
            element: <Logout />,
            loader: logoutLoader,
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
