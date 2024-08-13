import React, {useState, useEffect} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {StyledDish} from './Dish';
import {StyledUpdateDish} from './UpdateDish';
import {styled} from 'styled-components';

type Data<T> = T extends {logout: boolean}
  ? {logout: boolean}
  : {
      id: number;
      ingridients: {id: string; name: string; quantity: string; unit: string}[];
      logo: string;
      name: string;
      userid: number;
    };

const FoodCard = ({className}) => {
  const dish = useLoaderData() as Data<typeof dish>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLoginState();
  const [update, setUpdate] = useState<typeof dish | undefined>(false);

  useEffect(() => dish.logout && setValue(false), [dish]);

  return (
    <div className={className}>
      <nav>
        <Link to={'../../home'}>Back</Link>
      </nav>
      <main>
        {update ? (
          <StyledUpdateDish
            update={() => setUpdate(!update)}
            data={dish}
            className="dish-update"
          />
        ) : (
          <StyledDish
            update={() => setUpdate(!update)}
            data={dish}
            className="dish"
          />
        )}
      </main>
    </div>
  );
};

export const StyledFoodCard = styled(FoodCard)`
  nav {
    a:link,
    a:visited,
    a:hover,
    a:active {
      color: unset;
      text-decoration: none;
    }
  }

  main {
    display: flex;
    flex-direction: column;
  }
`;
