import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {App} from './routes/app';
import {Register, registerAction} from './routes/register';
import {Login, LoginError, loginAction} from './routes/login';
import {RequireAuth} from './routes/require-auth';
import {UserProfile, userProfileLoader} from './routes/profile';
import {
  UpdateUserProfile,
  updateUserProfileAction,
} from './routes/profile-update';
import {Dishes, dishesLoader} from './routes/dishes';
import {Dish, dishLoader} from './routes/dish';
import {addDishAction, AddDish} from './routes/dishes-add';
import {UpdateDish, updateDishAction} from './routes/dishes-update';
import {ShoppingLists, shoppingListsLoader} from './routes/lists';
import {AddShoppingList, addShoppingListAction} from './routes/lists-add';
import {
  UpdateShoppingList,
  updateShoppingListAction,
} from './routes/lists-update';
import {ShoppingList, shoppingListLoader} from './routes/list';
import {Home} from './routes/home';

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
            path: 'profile',
            element: <UserProfile />,
            loader: userProfileLoader,
            children: [
              {
                path: 'update',
                element: <UpdateUserProfile />,
                action: updateUserProfileAction,
              },
              {
                path: 'dishes',
                element: <Dishes />,
                loader: dishesLoader,
                children: [
                  {
                    path: ':id',
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
                    path: 'add',
                    element: <AddDish />,
                    action: addDishAction,
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
            ],
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
