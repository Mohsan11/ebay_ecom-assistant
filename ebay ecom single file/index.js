const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const CsvReadableStream = require("csv-reader");
const mongoose = require("mongoose");

const { check, validationResult } = require("express-validator");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const apiKey = process.env.Api_Key;
const Port = process.env.Port || 5000;
if (!apiKey || !UserName || !password) {
  console.error(
    "Missing environment variables. Please check your configuration."
  );
  process.exit(1);
}
const MongoDBUri = process.env.MongoDBUri;
const connectDB = async () => {
  try {
    await mongoose.connect(MongoDBUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

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
});

const Record = mongoose.model("Record", recordSchema);

connectDB();
app.post(
  "/api/create-record",
  [check("name", "Name is required").not().isEmpty()],
  check("listingType", "Listing type is required").not().isEmpty(),
  check("listingType", "Listing type is required").not().isEmpty(),
  check("valuePercentage", "Value Percentage type is required").not().isEmpty(),
  check("priceMethod", "Price Method is required").not().isEmpty(),
  check("dateExpense", "Date Expense is required").not().isEmpty(),
  check("expenseType", "Expense Type is required").not().isEmpty(),
  check("expenseDetails", "Expense Details is required").not().isEmpty(),
  check("invoiceSource", "Source is required").not().isEmpty(),
  check("mileage", "Mileage is required").not().isEmpty(),
  check("amount", "Amount is required").not().isEmpty(),
  check("priceNotes", "priceNotes is required").not().isEmpty(),
  check("fromLocation", "From Location is required").not().isEmpty(),
  check("toLocation", "Destination is required").not().isEmpty(),
  check("purpose", "Purpose is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: [{ msg: errors.array() }] });
    }
    const {
      name,
      listingType,
      valuePercentage,
      costNotes,
      priceMethod,
      dateExpense,
      expenseType,
      expenseDetails,
      invoiceSource,
      mileage,
      mileageNotes,
      amount,
      priceNotes,
      fromLocation,
      toLocation,
      purpose,
    } = req.body;
    try {
      const newRecord = new Record({
        name,
        listingType,
        valuePercentage,
        costNotes,
        priceMethod,
        dateExpense,
        expenseType,
        expenseDetails,
        invoiceSource,
        mileage,
        mileageNotes,
        amount,
        priceNotes,
        fromLocation,
        toLocation,
        purpose,
      });
      const request = await newRecord.save();
      if (request) {
        res.status(200).json("Record has been saved Scuuessfully.");
      }
    } catch (err) {
      res.status(404).json({ err: { msg: err } });
    }
  }
);
app.post("/api/calculate-milage", async (req, res) => {
  const locations = req.body.locations;
  try {
    const result = await calculateTotalDistance(locations);
    const totalDistance = await result.totalDistanceMiles;
    const totalDuration = await result.totalDurationSeconds;
    console.log("Total Distance (Miles):", result.totalDistanceMiles);
    console.log("Total Duration (Seconds):", result.totalDurationSeconds);
    if (result && totalDistance && totalDuration) {
      res.status(200).json({
        totalDistance: result.totalDistanceMiles,
        totalDuration: result.totalDurationSeconds,
      });
    }
  } catch (error) {
    res.status(404).json({ error: { msg: error } });
    console.error("Error:", error);
  }
});

app.post("/api/fetch-record", async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    console.log("Unable to Fetch Records!");
    res.status(404).json({ err: { msg: error } });
  }
});

app.listen(Port, () => {
  console.log("Server is running on Port: ", Port);
});

const calculateTotalDistance = async (locations) => {
  let totalDistance = 0;
  let totalDuration = 0;

  for (let i = 0; i < locations.length - 1; i++) {
    let origin = locations[i];
    let destination = locations[i + 1];

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      const element = data.rows[0].elements[0];
      if (element.status === "OK") {
        totalDistance += element.distance.value;
        totalDuration += element.duration.value;
      } else {
        console.error(
          "Unable to calculate distance for",
          origin,
          "to",
          destination
        );
      }
    } else {
      console.error("Error fetching data for", origin, "to", destination);
    }
  }

  // Convert totalDistance to miles or other desired units.
  const totalDistanceMiles = totalDistance / 1609.34; // 1 mile is approximately 1609.34 meters

  return {
    totalDistanceMiles,
    totalDurationSeconds: totalDuration,
  };
};
