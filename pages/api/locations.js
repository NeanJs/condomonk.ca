import { mongooseConnect } from "@/lib/mongoose";
import { Location } from "@/models/Location";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Location.findOne({ _id: req.query.id }));
      return;
    } else if (req.query?.name) {
      res.json(
        await Location.findOne({
          name: { $regex: req.query.name, $options: "i" },
        })
      );
      return;
    } else {
      res.status(200).json({
        data: await Location.find(),
        message: "Cities fetched successfully!",
      });
      return;
    }
  }
  if (method == "POST") {
    const { name, description } = req.body;
    const city = await Location.create({ name, description });
    res.status(200).json({
      city,
      message: "City added successfully!",
    });
    return;
  }
  if (method == "DELETE") {
    await Location.findByIdAndDelete(req.query?.id);
    res.json({
      message: "Deleted Successfully!",
    });
    return;
  }

  if (method == "PUT") {
    const { name, _id, description } = req.body;

    res.json({
      data: await Location.findByIdAndUpdate({ _id }, { name, description }),
      message: "City updated successfully!",
    });
    return;
  }
}
