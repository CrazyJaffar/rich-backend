const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    // Local account or Google
    accountType: {
      type: String,
      default: "local",
    },
    // Normal or admin
    role: {
      type: String,
      default: "normal",
    },
    // Account activation fields
    activated: {
      type: Boolean,
    },
    activatedAt: {
      type: Date,
    },
    //Other project related fields
  },
  { timestamps: true }
);

// Limit what fields you want to send back to the user
userSchema.statics.toClientObject = function (user) {
  const userObject = user?.toObject();

  const clientObject = {
    _id: userObject._id,
    email: userObject.email,
    name: userObject.name,
    role: userObject.role,
    activated: userObject.activated,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  };

  return clientObject;
};

module.exports = mongoose.model("User", userSchema);
