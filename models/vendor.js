const Joi = require("joi");
const mongoose = require("mongoose");
const { restaurantSchema } = require("./restaurant");

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  restaurantId: { type: String, required: true },
  contact: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
});

const VendorData = mongoose.model("VendorData", vendorSchema);

function validateVendorData(ven) {
  const schema = {
    vendorName: Joi.string().min(3).required(),
    city: Joi.string().min(2).required(),
    contact: Joi.number().min(10).required(),
    restaurantId: Joi.string().required(),
  };

  return Joi.validate(ven, schema);
}

exports.vendorSchema = vendorSchema;
exports.VendorData = VendorData;
exports.validate = validateVendorData;
