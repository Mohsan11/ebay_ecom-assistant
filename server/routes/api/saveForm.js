const express = require("express");
const router = express.Router();
const Form = require("../../model/Form");
router.post("/", async (req, res) => {
  try {
    const formData = req.body;
    const newForm2Item = new Form(formData);
    await newForm2Item.save();
    res
      .status(201)
      .json({ message: "Record saved successfully", item: newForm2Item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
