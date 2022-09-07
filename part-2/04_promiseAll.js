const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

// let userOne = getDataFromFilePromise(user1Path);
// let userTwo = getDataFromFilePromise(user2Path);

const readAllUsers = () => {
  // let user1 = getDataFromFilePromise(user1Path);
  // let user2 = getDataFromFilePromise(user2Path);
  // return Promise.all([user1, user2]).then((val) => {
  //   return val.map(function (data) {
  //     return JSON.parse(data);
  //   });
  // });

  return Promise.all([
    getDataFromFilePromise(user1Path),
    getDataFromFilePromise(user2Path),
  ]).then((values) => [JSON.parse(values[0]), JSON.parse(values[1])]);
};

readAllUsers();

module.exports = {
  readAllUsers,
};
