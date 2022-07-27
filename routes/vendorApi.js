const { VendorData, validate } = require("../models/vendor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const vendorDatas = await VendorData.find().sort("name");
  res.send(vendorDatas);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let vendorData = new VendorData({
    vendorName: req.body.vendorName,
    restaurantId: req.body.restaurantId,

    city: req.body.city,
    contact: req.body.contact,
  });
  vData = await vendorData.save();
  res.send(vData);
});

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const vendorData = await VendorData.findOneAndUpdate(
    req.query.id,
    {
      vendorName: req.body.vendorName,
      city: req.body.city,
      restaurantId: req.body.restaurantId,
      contact: req.body.contact,
    },

    {
      new: true,
    }
  );

  if (!vendorData)
    return res
      .status(404)
      .send("The vendorData with the given ID was not found.");

  res.send(vendorData);
});

router.delete("/", async (req, res) => {
  const vendorData = await VendorData.findOneAndRemove(req.query.id);

  if (!vendorData)
    return res
      .status(404)
      .send("The VendorData with the given ID was not found.");

  res.send(vendorData);
});

module.exports = router;
