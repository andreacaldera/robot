// const delay = (time = 1000) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });

export default {
  postData(url /* data */) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: '',
    });
  },
};
