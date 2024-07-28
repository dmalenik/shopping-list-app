import React, {useState, useEffect} from 'react';
import {Link, Outlet, useLoaderData, useNavigate} from 'react-router-dom';
import {styled} from 'styled-components';
import {useLoginState} from '../../hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
`;

const Navigation = styled.nav`
  align-self: start;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  column-gap: 15px;
`;

const Main = styled.main`
  align-self: center;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const DishContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ingridients = styled.div``;

const Ingridient = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Dish = () => {
  const dish = useLoaderData();
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<typeof dish | undefined>();
  const [storedValue, setValue] = useLoginState();

  useEffect(() => dish?.success && setValue(false), [dish]);

  return (
    <Container>
      <Navigation>
        <Link to={'../dishes'}>Back</Link>
      </Navigation>
      <Main>
        {dish && !dish.success ? (
          <DishContainer id={dish?.id}>
            <header>
              <h2>{dish?.dish}</h2>
            </header>
            <Ingridients>
              {dish?.components.map(c => (
                <Ingridient key={c.id}>
                  <li>{c.name}</li>
                  <li>{c.unit}</li>
                  <li>{c.size}</li>
                </Ingridient>
              ))}
            </Ingridients>
            <button
              type="button"
              onClick={() => {
                setUpdates(dish);
                navigate('update');
              }}
            >
              Update
            </button>
            <Outlet context={[updates, setUpdates]} />
          </DishContainer>
        ) : (
          <div>Empty</div>
        )}
      </Main>
    </Container>
  );
};
