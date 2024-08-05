import {redirect} from 'react-router-dom';

export const handleShoppingListItemAction = async ({request}: any) => {
  const formData = await request.formData();
  // eslint-disable-next-line n/no-unsupported-features/es-builtins
  const formEntries = Object.fromEntries(formData);

  if (formEntries.action === 'update' || formEntries.action === 'delete') {
    return postShoppingListUpdateData(formData);
  }

  return postShoppingListItemData(formData);
};

const postShoppingListItemData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/home/item/add', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const finalResponse: any = await response.json();

    return finalResponse;
  } catch (error) {
    return error;
  }
};

const postShoppingListUpdateData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/home/item/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return (
      ((success && formData.get('action') === 'update') ||
        (formData.get('action') === 'detele' && redirect('.'))) ??
      null
    );
  } catch (error) {
    return error;
  }
};
