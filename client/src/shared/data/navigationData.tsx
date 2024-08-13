import React from 'react';
import {GrDomain} from 'react-icons/gr';
import {GiArchiveRegister} from 'react-icons/gi';
import {FiLogIn} from 'react-icons/fi';

import type {NavigationType} from '../types';

export const navigationData: NavigationType = [
  {
    key: crypto.randomUUID(),
    title: 'Main',
    path: '/',
    icon: <GrDomain />,
  },
  {
    key: crypto.randomUUID(),
    title: 'Register',
    path: 'register',
    icon: <GiArchiveRegister />,
  },
  {
    key: crypto.randomUUID(),
    title: 'Login',
    path: 'login',
    icon: <FiLogIn />,
  },
];
