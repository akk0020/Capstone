import mongoose from "mongoose";

const restSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  location: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  type: {
    type: String,
    required: true,
    validate: /^[A-Za-z ]*$/,
  },
  rating: {
    type: Number,
    required: true,
    validate: /^[0-10 ]*$/,
  },
  anothertopic: {
    type: String,
  },
});

const restaurants = mongoose.model("restaurant", restSchema);

export default restaurants;
