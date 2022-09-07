const { text, json } = require("express");
const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

// __dirname : 파일명을 제외한 절대경로
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

// HINT: getDataFromFilePromise(user1Path) 및
//getDataFromFilePromise(user2Path) 를 이용해 작성합니다
const readAllUsersChaining = () => {
  // TODO: 여러개의 Promise를 then으로 연결하여 작성합니다
  return getDataFromFilePromise(user1Path).then((user1) => {
    return getDataFromFilePromise(user2Path).then((user2) => {
      // return `[${user1},${user2}]`;
      return [JSON.parse(user1), JSON.parse(user2)];
      // url은 문자열로 들어오기때문에 json.parse로 객체로 컴퓨터가 받아와야한다
    });
  });
  // .then((text) => JSON.parse(text));
};

module.exports = {
  readAllUsersChaining,
};
