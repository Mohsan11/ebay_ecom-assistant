const express = require("express");
const router = express.Router();
const Record = require("../../model/Record");
router.get("/", async (req, res) => {
  try {
    const data = await Record.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log("Unable to Fetch Records!");
    res.status(404).json({ err: { msg: error } });
  }
});
module.exports = router;
