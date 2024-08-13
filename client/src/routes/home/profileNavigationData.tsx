import {ProfileNavigationLinks} from './profileNavigationTypes';

export const profileNavigationData: ProfileNavigationLinks = [
  {
    key: crypto.randomUUID(),
    title: 'Home',
    path: 'home',
  },
  {
    key: crypto.randomUUID(),
    title: 'Add Dish',
    path: 'dish/add',
  },
  {
    key: crypto.randomUUID(),
    title: 'Shopping List',
    path: 'list',
  },
  {
    key: crypto.randomUUID(),
    title: 'Logout',
    path: 'logout',
  },
];
