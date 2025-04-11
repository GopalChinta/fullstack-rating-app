import express from "express";
import { submitRating, getRatingsByStore } from "../controllers/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a rating (Authenticated users)
router.post("/", protect, submitRating);

// Get all ratings for a specific store
router.get("/:storeId", protect, getRatingsByStore);

export default router;



