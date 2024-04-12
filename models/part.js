const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      indexe: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Part", partSchema);
