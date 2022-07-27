const mongoose = require("mongoose");
const restaurant = require("./routes/restaurantapi");
const { RestaurantData } = require("./models/restaurant");
const { VendorData } = require("./models/vendor");

const vendor = require("./routes/vendorApi");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/restaurant")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.get("/vendor_details", async (req, res) => {
  await VendorData.aggregate([
    {
      $lookup: {
        from: "restaurantdatas",
        localField: "restaurantId",
        foreignField: "_id",
        as: "info",
      },
    },
    {
      $unwind: "$info",
    },
  ])
    .then((result) => {
      console.log("RESULT", result);
      if (!result) {
        return res.status(400).send("Record does not exists");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
app.use("/api/restaurant", restaurant);
app.use("/api/vendor", vendor);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
