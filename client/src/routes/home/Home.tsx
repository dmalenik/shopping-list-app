import React, {useEffect, useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {StyledProfileNavigation} from './ProfileNavigation';
import {profileNavigationData} from './profileNavigationData';
import {StyledUser} from './User';
import {StyledUpdateUser} from './UpdateUserProfile';
import {StyledDishList} from './DishList';
import {styled} from 'styled-components';

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

const Home = ({className}) => {
  const data = useLoaderData() as Data<typeof data>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLoginState();
  const [update, setUpdate] = useState(false);

  // logout when session timeout
  useEffect(() => data.logout && setValue(false), [data]);

  return (
    <div className={className}>
      <StyledProfileNavigation
        className="profile-nav"
        menu={profileNavigationData}
      />
      <main>
        {update ? (
          <StyledUpdateUser
            data={data.user ?? null}
            update={() => setUpdate(!update)}
            className="user-edit"
          />
        ) : (
          <StyledUser
            data={data?.user ?? null}
            stats={{
              dishes: data.dishes?.length,
              items: data.items?.length,
            }}
            update={() => setUpdate(!update)}
            className="profile"
          />
        )}
        <StyledDishList data={data} className="dish-list" />
      </main>
    </div>
  );
};

export const StyledHome = styled(Home)`
  display: flex;
  flex-direction: column;

  main {
    align-self: center;
    text-align: center;
    padding: 3%;
    display: flex;
    flex-direction: column;
    row-gap: 35px;
  }
`;
