const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: String,
  listingType: String,
  valuePercentage: Number,
  costNotes: String,
  priceMethod: String,
  dateExpense: Date,
  expenseType: String,
  expenseDetails: String,
  invoiceSource: String,
  mileage: Number,
  mileageNotes: String,
  amount: Number,
  priceNotes: String,
  fromLocation: String,
  toLocation: [String],
  purpose: String,
  items: [String],
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
