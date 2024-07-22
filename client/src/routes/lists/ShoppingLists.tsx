import React from 'react';
import {Outlet, useLoaderData, Link} from 'react-router-dom';

export const ShoppingLists = () => {
  const shoppingLists: any = useLoaderData();

  return (
    <div>
      {shoppingLists && !shoppingLists.success ? (
        shoppingLists.map(
          ({
            id,
            name,
            elements,
            date,
            userid,
          }: {
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
          }) => (
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
            </div>
          )
        )
      ) : (
        <div>No lists for now</div>
      )}
      <Link to={'add'}>Add new shopping list</Link>
      <Outlet />
    </div>
  );
};
