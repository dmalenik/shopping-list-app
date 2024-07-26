import {redirect} from 'react-router-dom';

export const updateShoppingListAction = async ({request}: any) => {
  const formData = await request.formData();

  return postShoppingListData(formData);
};

const postShoppingListData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/profile/lists/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return (
      success &&
      (formData.get('action') === 'edit' ? redirect('..') : redirect('../..'))
    );
  } catch (error) {
    return error;
  }
};
