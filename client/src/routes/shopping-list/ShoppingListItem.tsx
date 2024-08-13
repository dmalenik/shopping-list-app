import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components';

const ShoppingListItem = ({data, edit, className}) => {
  const [item, setItem] = useState(data);

  useEffect(
    () =>
      edit.setter([
        ...edit.list.toSpliced(
          edit.list.findIndex(
            (el: {
              id: number;
              name: string;
              quantity: string;
              unit: string;
              userid: number;
              clicked: boolean;
            }) => el.id === item.id
          ),
          1,
          item
        ),
      ]),
    [item]
  );

  return (
    <div className={className}>
      <p>{`${item?.quantity} ${item?.unit} ${item?.name}`}</p>
      <button
        type="button"
        onClick={() => setItem({...item, clicked: !item.clicked})}
      >
        Edit
      </button>
    </div>
  );
};

export const StyledShoppingListItem = styled(ShoppingListItem)`
  display: flex;
  column-gap: 15px;
  align-items: center;
  justify-content: flex-start;

  button {
    height: 32px;
    border-radius: 12px;
    background-color: #151924;
    color: #ffffff;
    font-weight: 700;
    font-size: 17px;
  }
`;
