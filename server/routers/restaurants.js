import { Router } from "express";
import Restaurant from "../models/restaurant.js";

const router = Router();

// Create restaurant route
router.post("/", async (request, response) => {
  try {
    const newRestaurant = new Restaurant(request.body);

    const data = await newRestaurant.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all restaurant route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}
    console.log("query", request.query);
    const data = await Restaurant.find(query);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get a single restaurant by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Restaurant.findById(request.params.id);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete a restaurant by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Restaurant.findByIdAndDelete(request.params.id);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// delete all
router.delete("/", async (req, res) => {
  try {
    const result = await Restaurant.deleteMany({});
    res.status(200).json({
      message: `Deleted ${result.deletedCount} restaurant(s).`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurants", error });
  }
});

// Update a single restaurant by ID
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Restaurant.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          restaurantName: body.restaurantName,
          location: body.location,
          type: body.type,
          rating: body.rating,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
