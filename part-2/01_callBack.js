const fs = require("fs");

const getDataFromFile = function (filePath, callback) {
  // 인코딩을 utf-8로 안하면, raw buffer(이상한 숫자들)가 리턴된다
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

// getDataFromFile('README.md', (err, data) => console.log(data));

module.exports = {
  getDataFromFile,
};
