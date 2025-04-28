import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
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
  },
  anothertopic: {
    type: String,
  },
});

const restaurants = mongoose.model("restaurant", restaurantSchema);

export default restaurants;
