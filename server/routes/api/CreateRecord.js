const express = require("express");
const router = express.Router();
const Record = require("../../model/Record");
const { check, validationResult } = require("express-validator");
router.post(
  "/",
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
      return res.status(300).json({ errors: [{ msg: errors.array() }] });
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
      items,
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
        items,
      });
      const request = await newRecord.save();
      if (request) {
        console.log(request);
        res.status(200).json("Record has been saved Scuuessfully.");
      }
    } catch (err) {
      res
        .status(404)
        .json({ err: { msg: err, type: "Error while Saving Record!" } });
    }
  }
);
module.exports = router;
