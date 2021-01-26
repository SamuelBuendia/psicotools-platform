const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  password: { type: String, required: false },
  identification_number: { type: Number, required: true, unique: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: String, required: true },
  phone_1: { type: Number, required: true },
  phone_2: { type: Number, required: false },
  address: { type: String, required: true },
  city: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  active_at: { type: Date, default: Date.now },
  user_type: { type: String, default: "therapist" },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

UserSchema.methods.encryptPassword = async (password) => {
  const strPass = password.toString();
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(strPass, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
