export const getSubInfo = async(title: string) => {
    const url = `http://localhost/rettid/Api/sub/getSub/titlte:${title}`;
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "GET",
      headers: headers
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
}