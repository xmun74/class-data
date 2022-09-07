const http = require("http");

const PORT = 4999;
const ip = "localhost";

const server = http.createServer((request, response) => {
  const { method, url } = request;
  // console.log(request.body);      // request.body => 이렇게는 body 안받아와짐
  // 청크 = Buffer들의 조각들 <Buffer 012 123... > * ...
  // 왜 청크로 보냄?? 마치 대용량파일을 조각내서 받아오는 개념와 비슷
  // 터미널에서 npx nodemon --inspect app.js 하고 서버함수내 console.log(request)하면 request 내부 볼 수 있음
  // 수정해도 자동서버하려면 nodemon하기

  let body = [];
  request
    // data가 있을때 청크를 바디에 푸시
    .on("data", (chunk) => {
      body.push(chunk);
    })
    // end에 도달할 때(data없을 때) 바디(:버퍼로 가득 참)를 concat으로 하나로 합치고, 문자열로 변환
    .on("end", () => {
      body = Buffer.concat(body).toString();
      // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
      //  console.log(body); // body가 받아와짐

      // CORS처리 - preflight OPTIONS로 사전요청 : OPTIONS : 헤더에 CORS설정 되어있으면, 모든요청받아줌
      if (method === "OPTIONS") {
        // CORS 설정 메서드마다 각각 돌려줘야함 => 이래서 express씀
        response.writeHead(201, defaultCorsHeader);
        response.end(); // 1번 요청에는 1개의 응답이 있다. 밑에서 또보내면 2번 보내므로 오류남
      }

      if (method === "POST" && url === "/lower") {
        response.writeHead(201, defaultCorsHeader);
        response.end(body.toLowerCase());
      } else if (method === "POST" && url === "/upper") {
        response.writeHead(201, defaultCorsHeader);
        response.end(body.toUpperCase());
      }
      // response.end("response"); // 응답내용을 적어준다. 여기서 또 적으면 응답 2번 오류남
    })
    .on("error", (err) => {
      // 여기서 `stderr`에 오류 메시지와 스택 트레이스를 출력합니다.
      console.error(err.stack);
    });
  console.log(`http request method is ${method}, url is ${url}`);
});

// 지정포트로 연결하여 서버열기. listen메서드가 server객체에 전달되면 => `node 파일명`하면 서버가 켜짐
server.listen(PORT, ip, () => {
  console.log(`node 서버 열렸다 🔥 http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  // "*"말고 응답헤더 설정가능 'http://localhost:3000':서버4000에 오리진3000 요청권한받기
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": 10,
};
