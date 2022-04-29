const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";

const config = require("../config/key");

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});

function setUpload(bucket) {
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket, // 저장경로
      acl: "public-read-write", // 파일에 대한 제어를 누구에게 적용할 것인가.
      // NOTE 소유자는 모든 권한을 갖고, 다른 모든 유저는 읽기 권한을 가질 수 있다.
      key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  }).single("file");

  return upload;
}

module.exports = setUpload;
