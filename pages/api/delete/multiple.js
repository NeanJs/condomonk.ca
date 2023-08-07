import { Property } from "@/models/Property";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { client } from "../upload";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { id, keys } = req.body;
    await Property.findByIdAndRemove({ _id: id });
    if (keys.length) {
      for (let key of keys) {
        await client.send(
          new DeleteObjectCommand({
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: key.key,
          })
        );
      }
    }

    res.send({
      message: "Product deleted successfully!",
    });
    return;
  }
}
