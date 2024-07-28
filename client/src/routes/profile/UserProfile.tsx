import React, {useEffect} from 'react';
import {useLoaderData, useNavigate, Outlet, Link} from 'react-router-dom';
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

const ProfileLink = styled(Link)<{$isActive?: boolean}>`
  color: ${props => (props.$isActive ? 'red' : 'inherit')};
`;

const Main = styled.main`
  align-self: center;
  margin-top: 3%;
`;

export const UserProfile = () => {
  const user: unknown = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  // logout when session timeout
  useEffect(() => user?.success && setValue(false), [user]);

  return (
    <Container>
      <Navigation>
        <ProfileLink to={'.'} $isActive>
          Profile
        </ProfileLink>
        <Link to={'../dishes'}>Dishes</Link>
        <Link to={'../lists'}>Lists</Link>
        <Link to={'../logout'}>Logout</Link>
      </Navigation>
      {user?.id && (
        <Main>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <Link to={'update'}>Update</Link>
        </Main>
      )}
      <Outlet />
    </Container>
  );
};
