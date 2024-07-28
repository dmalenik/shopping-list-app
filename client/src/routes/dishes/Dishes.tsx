import React, {useEffect} from 'react';
import {Link, Outlet, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {styled} from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

const Navigation = styled.nav`
  align-self: end;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  column-gap: 15px;
`;

const DishesLink = styled(Link)<{$isActive?: boolean}>`
  color: ${props => (props.$isActive ? 'red' : 'inherit')};
`;

const Main = styled.main`
  align-self: center;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const Dishes = () => {
  const dishes: unknown = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => dishes?.success && setValue(false), [dishes]);

  return (
    <Container>
      <Navigation>
        <Link to={'../profile'}>Profile</Link>
        <DishesLink to={'.'} $isActive>
          Dishes
        </DishesLink>
        <Link to={'../lists'}>Lists</Link>
        <Link to={'../logout'}>Logout</Link>
      </Navigation>
      <Main>
        {dishes && !dishes.success ? (
          dishes.map(({id, dish}) => (
            <Link key={id} to={`../dishes/${id}`}>
              {dish}
            </Link>
          ))
        ) : (
          <div>No dishes in the list</div>
        )}
        <Link to={'add'}>Add new dish</Link>
      </Main>
      <Outlet />
    </Container>
  );
};
