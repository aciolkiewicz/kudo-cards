import mongoose from "mongoose";

const kudoCardSchema = new mongoose.Schema({
  cardTitle: { type: String, required: true },
  cardColor: { type: String, required: true },
  to: { type: String, required: true },
  for: { type: String, required: true },
  from: { type: String },
  gifUrl: { type: String },
  hearts: { type: Number, required: true },
  created: { type: String, required: true },
});

const KudoCard =
  mongoose.models.KudoCard || mongoose.model("KudoCard", kudoCardSchema);

export default KudoCard;
