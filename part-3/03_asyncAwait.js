// const newsURL = "http://localhost:4999/data/latestNews";
// const weatherURL = "http://localhost:4999/data/weather";

async function getNewsAndWeatherAsync() {
  // TODO: async/await 키워드를 이용해 작성합니다

  // let json0 = await fetch(newsURL).then((response) => response.json());
  // let json1 = await fetch(weatherURL).then((response) => response.json());

  // return {
  //   news: json0.data,
  //   weather: json1,
  // };

  const news = await fetch(newsURL)
    .then((res) => res.json())
    .then((json) => json.data);

  const weather = await fetch(weatherURL).then((res) => res.json());

  return { news, weather };
}
if (typeof window === "undefined") {
  module.exports = {
    getNewsAndWeatherAsync,
  };
}
