import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
type Data<T> = T extends {logout: boolean}
  ? {logout: boolean}
  : {id: number; userid: number}[];

const ShoppingList = ({className}) => {
  const data = useLoaderData() as Data<typeof data>;
  const [shoppingList, setShoppingList] = useState<
    {
      id: number;
      name: string;
      quantity: string;
      unit: string;
      userid: number;
      clicked: boolean;
    }[]
  >();
  const [newItem, setNewItem] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
