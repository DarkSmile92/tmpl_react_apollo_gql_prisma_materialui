const uuid = require("uuid/v1");
const { uploadPath } = require("../constants");
const fs = require("fs");
/*
// https://github.com/lphoward/fake-s3
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: "foo",
  secretAccessKey: "bar",
  params: {
    Bucket: "com.prisma.s3"
  },
  endpoint: new aws.Endpoint("http://localhost:4569") // fake s3 endpoint for local dev
});
*/

const storeUpload = ({ stream, filename }) => {
  const key = uuid() + "-" + filename;
  const path = `${uploadPath}/${key}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

exports.removeFile = async (path, ctx, info) => {
  if (!path) {
    return console.log('No File given!');
  }
  // check if file exists
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      return console.log(`File ${path} does not exist!`);
    } else {
      fs.unlink(path);
    }
  });
};

exports.processUpload = async (upload, ctx, info) => {
  if (!upload) {
    return console.log("ERROR: No file received.");
  }

  const { createReadStream, filename, mimetype, encoding } = await upload;
  console.log(`>> DBG: Filename: ${filename}`);
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });

  /*
  // Upload to S3
  const response = await s3
    .upload({
      Key: key,
      ACL: "public-read",
      Body: stream
    })
    .promise();

    const url = response.Location;
  // */
  // let result = await new Promise((resolve, reject) =>
  //   stream
  //     .pipe(createWriteStream(storePath))
  //     .on("finish", () => resolve({ id, path }))
  //     .on("error", reject)
  // );

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    // url
    url: path
  };

  const { id } = await ctx.db.mutation.createFile({ data }, info);

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    // url
    url: path
  };

  console.log("saved prisma file:");
  console.log(file);

  return file;
};
