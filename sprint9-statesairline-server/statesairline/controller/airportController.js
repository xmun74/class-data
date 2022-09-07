const airports = require("../repository/airportList");
// 라우터에 대한 행위를 컨트롤러에 쓰는 구조다

module.exports = {
  // [GET] /airport?query={query} 요청을 수행합니다.
  // 공항 이름 자동완성 기능을 수행합니다!
  findAll: (req, res) => {
    // query가 있으면 filter해서 보내기
    if (req.query.query !== undefined) {
      // http://localhost:3001/airport?query=c  조회시
      console.log(req.query); // { query: 'c' } key:value로 가져옴
      console.log(req.query.query); // c
      const list = airports.filter((item) => {
        return item.code.includes(req.query.query.toUpperCase());
      });
      return res.status(200).json(list);
    }
    res.json(airports);
  },
};
