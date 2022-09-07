const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsersAsyncAwait = async () => {
  // TODO: async/await 키워드를 이용해 작성합니다
  const one = await getDataFromFilePromise(user1Path);
  const two = await getDataFromFilePromise(user2Path); // 문자열
  return [JSON.parse(one), JSON.parse(two)]; // json.parse 객체로 변환
};

// readAllUsersAsyncAwait();

module.exports = {
  readAllUsersAsyncAwait,
};
