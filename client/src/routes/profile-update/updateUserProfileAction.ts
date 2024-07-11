import {redirect} from 'react-router-dom';

export const updateUserProfileAction = async ({request}: any) => {
  const formData = await request.formData();

  return postUpdateUserData(formData);
};

const postUpdateUserData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return success ? redirect('/profile') : null;
  } catch (error) {
    return error;
  }
};
