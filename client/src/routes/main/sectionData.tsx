import {MainPageSectionsTypes} from './sectionTypes';

export const mainPageData: MainPageSectionsTypes = [
  {
    id: crypto.randomUUID(),
    logo: {
      src: './dish-recipes-photo.jpg',
      alt: 'recipes-logo',
    },
    heading: 'Dish Recipes Database',
    description: `The app will have a comprehensive recipe database, covering a variety of
        cuisines, dietary preferences and food types. The recipes will include
        detailed ingredient lists, step by step instructions and cooking tips.`,
  },
  {
    id: crypto.randomUUID(),
    logo: {
      src: './shopping-list-photo.png',
      alt: 'shopping-list-logo',
    },
    heading: 'Shopping List',
    description: `The app will have a built-in shopping list feature that will allow users to add ingredients 
        from recipes directly to their shopping list. This feature ensures that the user has all the 
        necessary ingredients when shopping for groceries.`,
  },
];
