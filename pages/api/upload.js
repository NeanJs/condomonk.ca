import fs from "fs";
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multiparty from "multiparty";

export const client = new S3Client({
  forcePathStyle: false,
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "nyc3",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  if (method == "POST") {
    let links = [];
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    if (files.file) {
      for (let file of files.file) {
        const fileName = `properties/${fields.name + file.originalFilename}`;
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: fileName,
            Body: fs.createReadStream(file.path),
            ACL: "public-read",
          })
        );
        const link = {
          url: `${process.env.DO_SPACES_URL}/${fileName}`,
          key: fileName,
        };
        links.push(link);
      }
      res.send(links);
      return;
    }
  }
}
