import React, {useState} from 'react';
import {Link, Outlet, useLoaderData, useNavigate} from 'react-router-dom';

export const Dishes = () => {
  const dishes: any = useLoaderData();
  const [updates, setUpdates] = useState();
  const navigate = useNavigate();

  const handleUpdates = up => {
    setUpdates(up);
    navigate('update');
  };

  return (
    <div>
      {dishes && !dishes.success ? (
        dishes.map(
          ({
            dish,
            components,
            id,
          }: {
            dish: string;
            components: {
              name: string;
              unit: string;
              size: string;
              id: string;
            }[];
            id: string;
          }) => (
            <div key={id}>
              <div>{dish}</div>
              {components.map(({name, unit, size, id}) => (
                <div key={id}>
                  <div>{name}</div>
                  <div>{unit}</div>
                  <div>{size}</div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleUpdates({dish, components, id})}
              >
                Update
              </button>
            </div>
          )
        )
      ) : (
        <div>No dishes in the list</div>
      )}
      <Link to={'add'}>Add new dish</Link>
      <Outlet context={[updates, setUpdates]} />
    </div>
  );
};
