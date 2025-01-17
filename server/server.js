const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const CsvReadableStream = require("csv-reader");
const mongoose = require("mongoose");
const connectDB = require("./Config/db");
const Record = require("./model/Record");
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/create-record", require("./routes/api/CreateRecord"));
app.use("/api/save-form", require("./routes/api/saveForm"));
// app.use("/api/save-form2", require("./routes/api/saveForm2"));
app.use("/api/calculate-milage", require("./routes/api/CalculateMilage"));
app.use("/api/fetch-record", require("./routes/api/FetchRecords"));
const Port = process.env.Port || 5000;

let data = {
  name: [],
  title: [],
};
const filesreader = () => {
  const folderPath = "./folder";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return err;
    }

    const csvFiles = files.filter((file) => file.endsWith(".csv"));

    csvFiles.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      const inputStream = fs.createReadStream(filePath, "utf-8");

      inputStream
        .pipe(
          new CsvReadableStream({
            parseNumbers: true,
            parseBooleans: true,
            trim: true,
          })
        )
        .on("data", function (row) {
          data.name.push(row[0]);
          data.title.push(row[1]);

          // console.log("A row arrived: ", row);
        })
        .on("end", function () {
          console.log(`File ${file} processed. JSON data:`);
          console.log(JSON.stringify(data, null, 2));
          data.length = 0;
        });
    });
  });
};

const reader = () => {
  let inputStream = fs.createReadStream("./sample csv file.csv", "utf8");

  inputStream
    .pipe(
      new CsvReadableStream({
        parseNumbers: true,
        parseBooleans: true,
        trim: true,
      })
    )
    .on("data", function (row) {
      console.log("A row arrived: ", row);
    })
    .on("end", function () {
      console.log("No more rows!");
    });
};

// ----------------------------------------------------------------------------------------------
const distance = () => {
  const apiKey = process.env.Api_Key;

  async function calculateTotalDistance(locations) {
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
  }

  const locations = ["London", "Manchester", "Birmingham", "Stoke-on-Trent"];
  calculateTotalDistance(locations)
    .then((result) => {
      console.log("Total Distance (Miles):", result.totalDistanceMiles);
      console.log("Total Duration (Seconds):", result.totalDurationSeconds);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// distance();

// });
app.listen(Port, () => {
  console.log("Server is running on Port: ", Port);
});
