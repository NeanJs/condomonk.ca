import { Property } from "@/models/Property";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { client } from "../upload";

export default async function handler(req, res, err) {
  if (req.method == "POST") {
    const { id, key } = req.body;
    await client.send(
      new DeleteObjectsCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        key: key,
      })
    );
    await Property.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          pictures: {
            key: key,
          },
        },
      }
    );

    res.send({
      message: "Image deleted successfully!",
    });

    return;
  }
}
