export const signUp = (
  username: string,
  nickname: string,
  password: string,
  email: string
) => {
  const form = {
    username,
    nickname,
    password,
    email,
  };

  const url = "http://localhost/rettid/Api/users/signup";

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(form),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error!!!:", error.message);
    });
};

export const usernameTaken = async (username: string) => {
  const url = "http://localhost/rettid/Api/users/check_username";
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(username),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      return result.exists;
    })
    .catch((error) => {
      JSON;
      console.error("Error!!!:", error.message);
    });
};

export const emailTaken = async (email: string) => {
  const url = "http://localhost/rettid/Api/users/check_email";
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(email),
  };
  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      return result.exists;
    })
    .catch((error) => {
      JSON;
      console.error("Error!!!:", error.message);
    });
};

export const login = async (username: string, password:  string) => {
    const form = {
      username,
      password,
    };
    const url = "http://localhost/rettid/Api/users/login";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    };
   return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
