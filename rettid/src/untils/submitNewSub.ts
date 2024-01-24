export const submiteNewSub = async(title: string, username: string) => {
    const data = {
        title,
        username
    }
  const url = "http://localhost/rettid/Api/sub/create";
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };
 return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
      console.error(error.message);
    });
};
