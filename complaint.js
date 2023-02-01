const mongoose = require("mongoose");
const schema = mongoose.Schema;

const complaintSchema = new schema({
  // name: { type: String, required: true },
  //   email: { type: String, required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timestamps: { type: Date, required: true, default: Date.now },
});

const Complaint = (module.exports = mongoose.model(
  "Complaint",
  complaintSchema
));
