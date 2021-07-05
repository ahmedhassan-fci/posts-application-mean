const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "assets/avatar.png" },
  name: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

userSchema.plugin(uniqueValidator);
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
