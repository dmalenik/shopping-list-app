import {redirect} from 'react-router-dom';

export const addShoppingListAction = async ({request}: any) => {
  const formData = await request.formData();

  return postShoppingListData(formData);
};

const postShoppingListData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/profile/lists/create', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return success && redirect('..');
  } catch (error) {
    return error;
  }
};
