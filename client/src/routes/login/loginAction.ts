export const loginAction = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  return postLoginData(formData);
};

const postLoginData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const login = (await response.json()) as {login: boolean};

    return login;
  } catch (error) {
    return error;
  }
};
