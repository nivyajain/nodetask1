const Joi = require("joi");
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  address: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  catName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const RestaurantData = mongoose.model("RestaurantData", restaurantSchema);

function validateRestaurantData(rest) {
  const schema = {
    restaurantName: Joi.string().min(3).required(),
    phone: Joi.number().min(10).required(),
    address: Joi.string().min(6).required(),
    catName: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  };

  return Joi.validate(rest, schema);
}

exports.restaurantSchema = restaurantSchema;
exports.RestaurantData = RestaurantData;
exports.validate = validateRestaurantData;
