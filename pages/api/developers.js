import { mongooseConnect } from "@/lib/mongoose";
import { Developer } from "@/models/Developer";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method == "GET") {
    if (req.query?.id) {
      res.json(await Developer.findOne({ _id: req.query.id }));
      return;
    } else if (req.query?.name) {
      res.json(await Developer.findOne({ name: req.query.name }));
      return;
    } else {
      res.status(200).json({
        data: await Developer.find(),
        message: "Developers fetched successfully!",
      });
      return;
    }
  }
  if (method == "POST") {
    const { name } = req.body;
    const developer = await Developer.create({ name });
    res.status(200).json({
      developer,
      message: "developer added successfully!",
    });
    return;
  }
  if (method == "DELETE") {
    await Developer.findByIdAndDelete(req.query?.id);
    res.json({
      message: "Deleted Successfully!",
    });
    return;
  }

  if (method == "PUT") {
    const { name, _id } = req.body;

    res.json({
      data: await Developer.findByIdAndUpdate({ _id }, { name }),
      message: "developer updated successfully!",
    });
    return;
  }
}
