import React from 'react';
import {Link} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  margin: 3% 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPage = () => {
  return (
    <Container>
      <nav>
        <Link to={'register'}>Register</Link>
        <Link to={'login'}>Login</Link>
      </nav>
      <main>
        <section>
          <h2>Recipes</h2>
        </section>
        <section>
          <h2>Shopping list</h2>
        </section>
      </main>
    </Container>
  );
};
