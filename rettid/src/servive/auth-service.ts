import { generateRandomToken } from "../untils/generateToken";

export const signUp = async (
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

export const login = async (username: string, password: string) => {
  const token = generateRandomToken(16);
  localStorage.setItem("logged in", token);
  const form = {
    username,
    password,
    token,
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

export const loginWithToken = async (token: string) => {
  const url = "http://localhost/rettid/Api/users/tokenLogin";
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(token),
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

export const logout = async (token: string | null) => {
  const url = "http://localhost/rettid/Api/users/logout";
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(token),
  };
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
};
