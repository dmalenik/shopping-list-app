import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {UpdateShoppingListItem} from './UpdateShoppingListItem';
import {ShoppingListItem} from './ShoppingListItem';
import {AddShoppingListItem} from './AddShoppingListItem';

export const ShoppingList = () => {
  const data = useLoaderData();
  const [shoppingList, setShoppingList] = useState(
    data => !data?.logout && data?.map(item => ({clicked: false, ...item}))
  );
  const [newItem, setNewItem] = useState(false);
  const [storedValue, setValue] = useLoginState();

  // logout when session timeout
  // or update shopping list state
  useEffect(
    () =>
      data?.logout
        ? setValue(false)
        : setShoppingList(data?.map(item => ({clicked: false, ...item}))),
    [data]
  );

  return data && !data?.logout ? (
    <div>
      <nav>
        <Link to={'../home'}>Back</Link>
      </nav>
      <h2>Shopping List</h2>
      {shoppingList ? (
        <ul>
          {shoppingList.map(item => (
            <li key={item.id}>
              {item.clicked ? (
                <UpdateShoppingListItem data={item} />
              ) : (
                <ShoppingListItem
                  data={item}
                  edit={{list: shoppingList, setter: setShoppingList}}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>List is empty</div>
      )}
      {newItem && <AddShoppingListItem add={() => setNewItem(false)} />}
      <button type="button" onClick={() => setNewItem(true)}>
        Add new item
      </button>
    </div>
  ) : (
    <div>
      <nav>
        <Link to={'../home'}>Back</Link>
      </nav>
      <h2>Shopping List</h2>
      <p>List is empty</p>
      {newItem && <AddShoppingListItem add={() => setNewItem(false)} />}
      <button type="button" onClick={() => setNewItem(true)}>
        Add first item
      </button>
    </div>
  );
};
