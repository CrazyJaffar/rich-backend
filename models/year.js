const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema(
  {
    name: {
      type: Number,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Year", yearSchema);
