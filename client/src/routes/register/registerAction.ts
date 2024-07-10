import {redirect} from 'react-router-dom';

export const registerAction = async ({request}: any) => {
  const formData = await request.formData();

  return postRegisterData(formData);
};

const postRegisterData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return success ? redirect('/login') : null;
  } catch (error) {
    return error;
  }
};
