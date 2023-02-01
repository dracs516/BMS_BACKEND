const mongoose = require("mongoose");
const schema = mongoose.Schema;
const moment = require("moment-timezone");

const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

const userSchema = new schema({
  // name: { type: String, required: true },
  //   email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  room_no: { type: String, required: true },
  hostel: { type: String, required: true },
  phone_num: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamps: { type: Date, required: true, default: dateIndia },
});

const User = (module.exports = mongoose.model("User", userSchema));
