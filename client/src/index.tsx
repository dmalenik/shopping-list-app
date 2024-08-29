import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';

import {App} from './routes/app';
import {MainPage} from './routes/main';
import {StyledRegister, registerAction} from './routes/register';
import {StyledLogin, LoginError, loginAction} from './routes/login';
import {RequireAuth} from './routes/require-auth';
import {StyledHome, homeLoader, homeAction} from './routes/home';
import {StyledAddDish, addDishAction} from './routes/dish-add';
import {Logout, logoutLoader} from './routes/logout';
import {
  StyledFoodCard,
  foodCardLoader,
  updateDishAction,
} from './routes/food-card';
import {
  handleShoppingListItemAction,
  StyledShoppingList,
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
        element: <StyledRegister className="register" />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <StyledLogin className="login" />,
        errorElement: <LoginError />,
        action: loginAction,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'home',
            element: <StyledHome className="home" />,
            loader: homeLoader,
            action: homeAction,
          },
          {
            path: 'dish/add',
            element: <StyledAddDish className="dish-add" />,
            action: addDishAction,
            loader: async () => await fetch('/api/dish/add'),
          },
          {
            path: 'dish/:id',
            element: <StyledFoodCard className="food-cards" />,
            loader: foodCardLoader,
            action: updateDishAction,
          },
          {
            path: 'list',
            element: <StyledShoppingList className="shopping-list" />,
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
