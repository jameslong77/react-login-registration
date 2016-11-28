export async function login(username, password) {

  const url = 'http://api.rest-user-api.dev/app_acceptance.php/login';

  const requestConfig = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  };

  const response = await fetch(url, requestConfig);

  const data = response.json();

  if (response.status === 200) {
    return data;
  }

  // throw


}
