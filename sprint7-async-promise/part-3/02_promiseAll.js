// const newsURL = "http://localhost:4999/data/latestNews";
// const weatherURL = "http://localhost:4999/data/weather";

function getNewsAndWeatherAll() {
  // TODO: Promise.all을 이용해 작성합니다

  // return Promise.all([fetch(newsURL), fetch(weatherURL)]) //
  //   .then(([newsResponse, weatherResponse]) => {
  //     return Promise.all([newsResponse.json(), weatherResponse.json()]);
  //   })
  //   .then(([news, weather]) => {
  //     return {
  //       news: news.data,
  //       weather,
  //     };
  //   });

  const news = fetch(newsURL)
    .then((res) => res.json())
    .then((json) => json.data);
  const weather = fetch(weatherURL).then((res) => res.json());

  return Promise.all([news, weather]).then((values) => {
    return { news: values[0], weather: values[1] };
  });
}

if (typeof window === "undefined") {
  module.exports = {
    getNewsAndWeatherAll,
  };
}
