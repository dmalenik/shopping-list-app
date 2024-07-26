import React from 'react';
import {Link} from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Link to={'register'}>Register here</Link>
      <Link to={'login'}>Login here</Link>
      <p>Home is where you are!</p>
      <p>Plan your shopping here</p>
    </div>
  );
};
