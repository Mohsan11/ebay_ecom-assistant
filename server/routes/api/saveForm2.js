const express = require("express");
const router = express.Router();
const Form2 = require("../../model/Form2");
router.post("/", async (req, res) => {
  try {
    const formData2 = req.body;
    const newForm2Item = new Form2(formData2);
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
