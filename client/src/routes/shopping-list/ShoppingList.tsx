import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {StyledUpdateShoppingListItem} from './UpdateShoppingListItem';
import {StyledShoppingListItem} from './ShoppingListItem';
import {StyledAddShoppingListItem} from './AddShoppingListItem';
import {styled} from 'styled-components';

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
      data.logout
        ? setValue(false)
        : setShoppingList(data.map(item => ({clicked: false, ...item}))),
    [data]
  );

  return (
    <div className={className}>
      <nav>
        <Link to={'../home'}>Back</Link>
      </nav>
      <main>
        {shoppingList ? (
          <ul>
            {shoppingList.map(item => (
              <li key={item.id}>
                {item.clicked ? (
                  <StyledUpdateShoppingListItem
                    data={item}
                    className="list-update"
                  />
                ) : (
                  <StyledShoppingListItem
                    data={item}
                    edit={{list: shoppingList, setter: setShoppingList}}
                    className="list-item"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>List is empty</p>
        )}
        {newItem && (
          <StyledAddShoppingListItem
            add={() => setNewItem(false)}
            className="list-add"
          />
        )}
        <button
          type="button"
          onClick={() => setNewItem(true)}
          className="list-btn-add"
        >
          Add new item
        </button>
      </main>
    </div>
  );
};

export const StyledShoppingList = styled(ShoppingList)`
  display: flex;
  flex-direction: column;

  nav {
    a {
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: unset;
        text-decoration: none;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: 400;
    line-height: 20px;

    ul {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }

    .list-btn-add {
      width: 120px;
      height: 52px;
      border-radius: 12px;
      background-color: #151924;
      color: #ffffff;
      font-weight: 700;
      font-size: 17px;
      margin-top: 25px;
    }
  }
`;
