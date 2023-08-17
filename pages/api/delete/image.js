import { Property } from "@/models/Property";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { client } from "../upload";

export default async function handler(req, res, err) {
  if (req.method == "POST") {
    const { id, key } = req.body;

    const property = await Property.updateOne(
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
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key,
      })
    );
    res.send({
      data: property,
      message: "Image deleted successfully!",
    });
  }
}
