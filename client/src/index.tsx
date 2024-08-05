import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {App} from './routes/app';
import {Register, registerAction} from './routes/register';
import {Login, LoginError, loginAction} from './routes/login';
import {RequireAuth} from './routes/require-auth';
import {Home, homeLoader, homeAction} from './routes/home';
import {MainPage} from './routes/main';
import {AddDish, addDishAction} from './routes/dish-add';
import {Logout, logoutLoader} from './routes/logout';
import {FoodCard, foodCardLoader, updateDishAction} from './routes/food-card';
import {
  handleShoppingListItemAction,
  ShoppingList,
  shoppingListLoader,
} from './routes/shopping-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainPage />,
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
            path: 'home/dish/:id',
            element: <FoodCard />,
            loader: foodCardLoader,
            action: updateDishAction,
          },
          {
            path: 'home/list',
            element: <ShoppingList />,
            loader: shoppingListLoader,
            action: handleShoppingListItemAction,
            id: 'list',
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
