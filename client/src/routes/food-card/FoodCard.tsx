import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {Dish} from './Dish';
import {UpdateDish} from './UpdateDish';

export const FoodCard = () => {
  const dish = useLoaderData();
  const [storedValue, setValue] = useLoginState();
  const [update, setUpdate] = useState<typeof dish | undefined>(false);

  useEffect(() => dish?.logout && setValue(false), [dish]);

  return (
    <div>
      <nav>
        <Link to={'../../home'}>Back</Link>
      </nav>
      <main>
        {update ? (
          <UpdateDish update={() => setUpdate(!update)} data={dish} />
        ) : (
          <Dish update={() => setUpdate(!update)} data={dish} />
        )}
      </main>
    </div>
  );
};
