import { mongooseConnect } from "@/lib/mongoose";
import { Property } from "@/models/Property";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  res.setHeader("Content-Type", "application/json");
  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Property.findOne({ _id: req.query.id }));
      return;
    }
    if (req.query?.city) {
      res.json({ data: await Property.find({ location: req.query.city }) });
      return;
    }
    res.send({
      data: await Property.find(),
      message: "Properties fetched successfully!",
    });
    return;
  }
  if (method == "POST") {
    const { name, location, deposit, occupancy, pictures, description } =
      req.body;
    if (!req.body) {
      res.send(404).json({
        message: "One or more fields missing!",
      });
      return;
    } else {
      await Property.create({
        name,
        location,
        deposit,
        occupancy,
        pictures,
        description,
      });
      res.send({
        message: "Property added successfully!",
      });
      return;
    }
  }
  if (method == "PUT") {
    const { name, location, occupancy, deposit, pictures, _id, description } =
      req.body;
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id },
      {
        name,
        location,
        occupancy,
        deposit,
        pictures,
        description,
      }
    );
    res.status(200).json({
      updatedProperty,
      message: "Property updated successfully!",
    });
    return;
  }
}
