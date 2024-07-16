import React from 'react';
import {Link, Outlet, useLoaderData} from 'react-router-dom';

export const Dishes = () => {
  const loaderData = useLoaderData();

  return (
    <div>
      {!loaderData.success ? (
        loaderData.map(({id, dish, components}, i) => (
          <div key={i}>
            <div>{dish}</div>
            {components.map((component, idx) => {
              const obj = JSON.parse(component);
              const {name, unit, size} = obj;

              return (
                <div key={idx}>
                  <div>{name}</div>
                  <div>{unit}</div>
                  <div>{size}</div>
                </div>
              );
            })}
            <div>{id}</div>
            <button type="button">Update</button>
          </div>
        ))
      ) : (
        <div>No dishes in the list</div>
      )}
      <Link to={'add'}>Add new dish</Link>
      <Link to={'update'}>Update dish</Link>
      <Outlet />
    </div>
  );
};
