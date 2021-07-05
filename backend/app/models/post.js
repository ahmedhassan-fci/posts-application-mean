const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
postSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", postSchema);
