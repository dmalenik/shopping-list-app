import {redirect} from 'react-router-dom';

export const homeAction = async ({request}: any) => {
  const formData = await request.formData();

  return postUpdateUserData(formData);
};

const postUpdateUserData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const finalResponse: any = await response.json();

    return finalResponse?.logout ? redirect('../login') : finalResponse;
  } catch (error) {
    return error;
  }
};
