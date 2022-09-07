const flights = require("../repository/flightList");
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    const { flight_uuid, phone } = req.query;

    if (req.query) {
      if (flight_uuid) {
        let result = booking.filter((el) => el.flight_uuid === flight_uuid);
        return res.status(200).json(result);
      }
      if (phone) {
        let result = booking.filter((el) => el.phone === phone);
        return res.status(200).json(...result);
      }
    }
    return res.status(200).json(booking);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  // 응답으로는 book_id를 리턴합니다.
  // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답에 더욱 적합합니다.
  // 참고 링크: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#useful-post-responses
  create: (req, res) => {
    // TODO:
    booking.push(req.body);
    // location 헤더로 restful 하게 만들기
    const { flight_uuid } = bookData;
    res.location(`/book/${flight_uuid}`);
    return res.status(201).json({ flight_uuid });
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: (req, res) => {
    // TODO:
    const { phone } = req.query;

    booking = booking.filter((el) => el.phone !== phone);
    return res.status(200).json(booking);
  },
};
