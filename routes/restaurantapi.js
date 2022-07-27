const { RestaurantData, validate } = require("../models/restaurant");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const RestaurantDatas = await RestaurantData.find().sort("name");
  res.send(RestaurantDatas);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let restaurantData = new RestaurantData({
    restaurantName: req.body.restaurantName,
    phone: req.body.phone,
    address: req.body.address,
    catName: req.body.catName,
    quantity: req.body.quantity,
  });
  restaurantData = await restaurantData.save();
  res.send(restaurantData);
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const restaurantData = await RestaurantData.findOneAndUpdate(
    req.query.id,
    {
      address: req.body.address,
      phone: req.body.phone,
      restaurantName: req.body.restaurantName,
      catName: req.body.catName,
      quantity: req.body.quantity,
    },
    {
      new: true,
    }
  );

  if (!restaurantData)
    return res
      .status(404)
      .send("The RestaurantData with the given ID was not found.");

  res.send(restaurantData);
});

router.delete("/", async (req, res) => {
  const restaurantData = await RestaurantData.findOneAndRemove(req.query.id);

  if (!restaurantData)
    return res
      .status(404)
      .send("The RestaurantData with the given ID was not found.");

  res.send(restaurantData);
});

module.exports = router;
