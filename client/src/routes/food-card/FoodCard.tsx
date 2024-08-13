import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
type Data<T> = T extends {logout: boolean}
  ? {logout: boolean}
  : {
      id: number;
      ingridients: {id: string; name: string; quantity: string; unit: string}[];
      logo: string;
      name: string;
      userid: number;
    };
  const dish = useLoaderData() as Data<typeof dish>;
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
