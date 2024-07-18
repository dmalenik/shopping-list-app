import React, {useState} from 'react';
import {Link, Outlet, useLoaderData, useNavigate} from 'react-router-dom';

export const Dishes = () => {
  const loaderData: any = useLoaderData();
  const [updates, setUpdates] = useState();
  const navigate = useNavigate();

  const handleUpdates = up => {
    setUpdates(up);
    navigate('update');
  };

  return (
    <div>
      {!loaderData || loaderData.success ? (
        <div>No dishes in the list</div>
      ) : (
        loaderData.map(
          (
            obj: {
              dish: string;
              components: {name: string; unit: string; size: string}[];
              id: string;
            },
            i: number
          ) => {
            const {dish, components, id} = obj;

            return (
              <div key={i}>
                <div>{dish}</div>
                {components.map((component, idx) => {
                  const {name, unit, size} = component;

                  return (
                    <div key={idx}>
                      <div>{name}</div>
                      <div>{unit}</div>
                      <div>{size}</div>
                    </div>
                  );
                })}
                <div>{id}</div>
                <button type="button" onClick={() => handleUpdates(obj)}>
                  Update
                </button>
              </div>
            );
          }
        )
      )}
      <Link to={'add'}>Add new dish</Link>
      <Outlet context={[updates, setUpdates]} />
    </div>
  );
};
