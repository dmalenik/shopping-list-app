import React from 'react';
import {useLoaderData, Form, useActionData} from 'react-router-dom';

function App() {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const actionData = useActionData();
  console.log(actionData);

  return (
    <div className="App">
      Hello world from App!{' '}
      <Form method="post">
        <input type="text" name="username" placeholder="enter username" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

const appLoader = async () => {
  return getAppData();
};

const getAppData = async () => {
  try {
    const response = await fetch('/api');

    return await response.json();
  } catch (error) {
    return error;
  }
};

const appAction = async ({request}) => {
  const formData = await request.formData();

  return postRegisterData(formData);
};

const postRegisterData = async (formData: FormData) => {
  try {
    const response = await fetch('/api', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

export default App;
export {appLoader, appAction};
