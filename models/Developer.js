import { Schema, models, model } from "mongoose";

const DeveloperSchema = new Schema({
  name: { type: String, required: true },
});

const Developer = models?.developers || model("developers", DeveloperSchema);
export { Developer };
