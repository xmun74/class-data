const flights = require("../repository/flightList");

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: (req, res) => {
    // TODO:
    const { departure_times, arrival_times, destination, departure } =
      req.query;
    // 쿼리가 없다면 flights 모두 보내기
    if (Object.keys(req.query).length === 0) return res.json(flights);

    if (req.query) {
      if (departure_times && arrival_times) {
        let result = flights.filter(
          (el) =>
            el.departure_times === departure_times &&
            el.arrival_times === arrival_times
        );
        return res.json(result);
      }
      if (destination && departure) {
        let result = flights.filter(
          (el) => el.destination === destination && el.departure === departure
        );
        return res.json(result);
      }
    } else return res.json("Incorrect request");

    return res.json(flights);
  },
  // [GET] /flight/:id
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    let data = flights.filter((el) => el.uuid === req.params.id);
    return res.json(data);
  },

  // [PUT] /flight/:id 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    let data;
    // TODO:
    console.log(req.params.id);
    if (req.params.id) {
      data = flights.map(function (el) {
        if (el.uuid === req.params.id) {
          el = req.body;
        }
      });
    }
    return res.status(200).json(data);
  },
};
