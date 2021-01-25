const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  identification_number: { type: Number, required: true, unique: true },
  name: { type: String, require: true },
  lastname: { type: String, require: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
