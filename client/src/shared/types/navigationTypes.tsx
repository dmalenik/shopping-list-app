import {IconType} from 'react-icons';

type MenuElementType = {
  key: string;
  title: string;
  path: string;
  icon: React.ReactElement<IconType>;
};

export type NavigationType = MenuElementType[];
