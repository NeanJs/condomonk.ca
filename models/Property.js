const { model, models, Schema, default: mongoose } = require("mongoose");

const PropertySchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  occupancy: { type: Number, required: true },
  deposit: { type: Number, required: true },
  pictures: { type: [{}] },
});

const Property = models.Property || model("Property", PropertySchema);
export { Property };
