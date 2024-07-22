import React, {useState} from 'react';
import {Outlet, useLoaderData, Link, useNavigate} from 'react-router-dom';

export const ShoppingLists = () => {
  const shoppingLists: unknown = useLoaderData();
  const [updates, setUpdates] = useState<unknown>();
  const navigate = useNavigate();

  const handleUpdates = up => {
    setUpdates(up);
    navigate('update');
  };

  return (
    <div>
      {shoppingLists && !shoppingLists.success ? (
        shoppingLists?.map(
          (list: {
            id: string;
            name: string;
            elements: {
              item: string;
              measure: string;
              unit: string;
              id: string;
            }[];
            date: string;
            userid: string;
          }) => {
            const {id, name, elements, date, userid} = list;

            return (
              <div key={id}>
                <div>{name}</div>
                {elements.map(
                  ({
                    item,
                    measure,
                    unit,
                    id,
                  }: {
                    item: string;
                    measure: string;
                    unit: string;
                    id: string;
                  }) => (
                    <div key={id}>
                      <div>{item}</div>
                      <div>{measure}</div>
                      <div>{unit}</div>
                    </div>
                  )
                )}
                <button type="button" onClick={() => handleUpdates(list)}>
                  Update
                </button>
              </div>
            );
          }
        )
      ) : (
        <div>No lists for now</div>
      )}
      <Link to={'add'}>Add new shopping list</Link>
      <Outlet context={[updates, setUpdates]} />
    </div>
  );
};
