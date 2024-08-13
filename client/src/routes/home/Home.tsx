import React, {useEffect, useState} from 'react';
import {useLoaderData, Link} from 'react-router-dom';
import {useLoginState} from '../../hooks';
type Data<T> = T extends {logout: boolean}
  ? {logout: boolean}
  : {
      dishes: {id: number; logo?: string; name: string}[];
      items: {
        id: number;
        name: string;
        quantity: string;
        unit: string;
        userid: number;
      }[];
      user: {id: number; email: string; username: string};
    };
  const data = useLoaderData() as Data<typeof data>;
  const [storedValue, setValue] = useLoginState();
  const [update, setUpdate] = useState(false);

  // // logout when session timeout
  useEffect(() => data?.logout && setValue(false), [data]);

  return (
    <div>
      <nav>
        <Link to={'.'}>Home</Link>
        <Link to={'dish/add'}>Add dish</Link>
        <Link to={'list'}>Shopping list</Link>
        <Link to={'../logout'}>Logout</Link>
      </nav>
      <main>
        {update ? (
          <UpdateUser
            data={data?.user ?? null}
            update={() => setUpdate(!update)}
          />
        ) : (
          <User
            data={data?.user ?? null}
            stats={{dishes: data?.dishes?.length, items: 41}}
            update={() => setUpdate(!update)}
          />
        )}
        <section>
          <h3>What do you want to cook today?</h3>
          <div>
            {data?.dishes?.map(({id, name, logo}) => (
              <div key={id}>
                <img src={logo} alt="logo" />
                <Link to={`./dish/${id}`}>{name}</Link>
              </div>
            )) ?? <p>Empty list</p>}
          </div>
        </section>
      </main>
    </div>
  );
};
