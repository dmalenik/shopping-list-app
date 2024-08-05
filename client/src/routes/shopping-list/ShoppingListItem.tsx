import React, {useEffect, useState} from 'react';

export const ShoppingListItem = ({data, edit}) => {
  const [item, setItem] = useState(data);

  useEffect(
    () =>
      edit.setter([
        ...edit.list.toSpliced(
          edit.list.findIndex(el => el.id === item.id),
          1,
          item
        ),
      ]),
    [item]
  );

  return (
    <div>
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