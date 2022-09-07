const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

const PORT = 4999;

// 모든요청에 cors 적용
app.use(cors());

// body parsing (js로 다룰 수 있게 json으로 변환) 가져오기 https://expressjs.com/ko/4x/api.html#req.body
// strict:true가 기본값으로 배열과 객체만 받는다는 뜻임. 이를 false로 비활성화하여 Json.parse가 허용하는 모든 항목을 허용하게 해서 문자열도 parse시켜준다.
//JSON.parse()
app.use(express.json({ strict: false }));

// 모든 요청시(app.use()) 콘솔에 http메서드, url 찍는 용도
app.use((req, res, next) => {
  const { method, url } = req;
  console.log(`http request method is ${method}, url is ${url}`);
  next();
});

// postman에서 GET '/' 응답으로 확인용 메시지 보냄
app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!");
});

app.post("/lower", (req, res) => {
  // res.json() = JSON.stringify(): json으로 받아온 값을 문자열로 변환해서 웹 서버로 보내기
  // req.body : 받아온 값 payload
  res.json(req.body.toLowerCase());
});
app.post("/upper", (req, res) => {
  res.json(req.body.toUpperCase());
});

app.listen(PORT, () => {
  console.log(
    `express 서버로 리팩토링👐  http server listen on 'http://localhost:${PORT}'`
  );
});

// 시작하기 -  설치, 헬로우월드, 기본라우팅
// 안내서 - express.Router, 미들웨어작성, 미들웨어사용
// API참조(4.x) - express.json()에서 (options strict)/ req.params /req.query /app.use
// res.end()는 가볍게 봐라 / res.send()
// res.json()와 res.send() 차이는?
// json()은 json응답이고, send는 application/json이 아닌 text/html로 전달함. 다양한 유형(문자열, 배열, 객체 등)의 응답
// 자원 - 미들웨어(cors)
