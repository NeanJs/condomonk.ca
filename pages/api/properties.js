import { mongooseConnect } from "@/lib/mongoose";
import { Property } from "@/models/Property";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  res.setHeader("Content-Type", "application/json");
  if (method == "GET") {
    if (req.query?.slug) {
      res.json(await Property.findOne({ slug: req.query.slug }));
      return;
    }
    if (req.query?.city) {
      res.json({
        data: await Property.find({
          city: { $regex: req.query.city, $options: "i" },
        }),
      });
      return;
    }
    res.send({
      data: await Property.find(),
      message: "Properties fetched successfully!",
    });
    return;
  }
  if (method == "POST") {
    const {
      name,
      developer,
      price,
      type,
      status,
      completion,
      city,
      address,
      postalcode,
      description,
      deposits,
      pictures,
      floorPlans,
      slug,
    } = req.body;
    if (!req.body) {
      res.send(404).json({
        message: "One or more fields missing!",
      });
      return;
    } else {
      await Property.create({
        name,
        developer,
        price,
        type,
        status,
        completion,
        city,
        address,
        postalcode,
        description,
        deposits,
        pictures,
        floorPlans,
        slug,
      });
      res.send({
        message: "Property added successfully!",
      });
      return;
    }
  }
  if (method == "PUT") {
    const {
      name,
      developer,
      price,
      type,
      status,
      completion,
      city,
      address,
      postalcode,
      description,
      deposits,
      pictures,
      floorPlans,
      slug,
      _id,
    } = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id },
      {
        name,
        developer,
        price,
        type,
        status,
        completion,
        city,
        address,
        postalcode,
        description,
        deposits,
        pictures,
        floorPlans,
        slug,
      }
    );
    res.status(200).json({
      updatedProperty,
      message: "Property updated successfully!",
    });
    return;
  }
}
