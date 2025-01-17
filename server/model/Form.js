const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  toLocation: {
    type: [String],
    default: [],
  },
  Calculate_Milage: {
    type: Boolean,
    default: false,
  },
  mileage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  invoice: {
    type: String,
    default: "",
  },
  milageItems: [
    {
      name: {
        type: String,
        default: "",
      },
      cost: {
        type: Number,
        default: 0,
      },
      mileage: {
        type: Number,
        default: 0,
      },
      notes: {
        type: String,
        default: "",
      },
    },
  ],
  items: [
    {
      itemDetail: {
        type: String,
        default: "",
      },
      value: {
        type: Number,
        default: 0,
      },
      location: {
        type: String,
        default: "",
      },
    },
  ],
  recordNotes: {
    type: String,
    default: "",
  },
  formType: {
    type: String,
    default: "",
  },
});

const Record = mongoose.model("FormRecord", formSchema);

module.exports = Record;
