import mongoose from "mongoose";

const kudoCardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  cardTitle: { type: String, required: true },
  cardColor: { type: String, required: true },
  to: { type: String, required: true },
  for: { type: String, required: true },
  from: { type: String },
});

const KudoCard =
  mongoose.models.KudoCard || mongoose.model("KudoCard", kudoCardSchema);

export default KudoCard;
