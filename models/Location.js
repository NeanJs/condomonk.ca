import { Schema, models, model } from "mongoose";

const LocationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Location = models?.locations || model("locations", LocationSchema);
export { Location };
