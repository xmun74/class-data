const newsURL = "http://localhost:4999/data/latestNews";
const weatherURL = "http://localhost:4999/data/weather";

function getNewsAndWeather() {
  // TODO: fetch을 이용해 작성합니다
  // TODO: 여러개의 Promise를 then으로 연결하여 작성합니다
  // return fetch(newsURL)
  //   .then((res) => res.json()) // Promise 반환
  //   .then((news) => {
  //     return fetch(weatherURL)
  //       .then((res) => res.json()) // Promise 반환
  //       .then((weather) => {
  //         console.log(news);
  //         return {
  //           news: news.data,
  //           weather,
  //         };
  //       });
  //   });

  return fetch(newsURL)
    .then((res) => res.json())
    .then((json) => json.data) // news.data를 받아옴
    .then((news) => {
      return fetch(weatherURL)
        .then((res) => res.json())
        .then((weather) => {
          return {
            news, // news.data
            weather,
          };
        });
    });
}

if (typeof window === "undefined") {
  module.exports = {
    getNewsAndWeather,
  };
}
