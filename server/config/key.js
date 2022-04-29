if (process.env.NODE_ENV === "production") {
  // NOTE 배포상태
  module.exports = require("./production");
} else {
  // NOTE 개발상태
  module.exports = require("./dev");
}
