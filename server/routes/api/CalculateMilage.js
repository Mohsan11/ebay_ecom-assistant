const express = require("express");
const router = express.Router();

const apiKey = process.env.Api_Key;

router.post("/", async (req, res) => {
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
    res.status("404").json({ error: { msg: error } });
    console.error("Error:", error);
  }
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

module.exports = router;
