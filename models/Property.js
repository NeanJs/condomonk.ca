const { model, models, Schema, default: mongoose } = require("mongoose");

const PropertySchema = new Schema({
  name: { type: String, required: true },
  developer: { type: Object, ref: "developer" },
  price: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  completion: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalcode: { type: String, required: true },
  description: { type: String, required: true },
  deposits: { type: String, required: true },
  pictures: { type: [{}] },
  floorPlans: { type: [], required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  slug: {
    type: String,
    required: true,
  },
});

const Property = models.Property || model("Property", PropertySchema);
export { Property };
