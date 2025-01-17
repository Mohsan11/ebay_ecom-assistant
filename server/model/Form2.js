const mongoose = require("mongoose");

const form2Schema = new mongoose.Schema({
  date: { type: String, required: true },
  type: { type: String, required: true },
  items: {
    type: [{ itemDetail: String, value: Number, location: String }],
    required: false,
  },
  recordDetails: { type: String, required: false },
  formType: { type: String, required: true },
});
const Record = mongoose.model("Form2Record", form2Schema);

module.exports = Record;
