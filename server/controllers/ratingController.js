import Rating from "../models/Rating.js";
import Store from "../models/Store.js";

// @desc    Submit a rating
// @route   POST /api/ratings
export const submitRating = async (req, res) => {
  try {
    const { storeId, rating, comment } = req.body;

    const newRating = new Rating({
      store: storeId,
      user: req.user._id,
      rating,
      comment,
    });

    await newRating.save();
    res.status(201).json({ message: "Rating submitted successfully", rating: newRating });
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating", error });
  }
};

// @desc    Get ratings for a store
// @route   GET /api/ratings/:storeId
export const getRatingsByStore = async (req, res) => {
  try {
    const ratings = await Rating.find({ store: req.params.storeId }).populate("user", "name email");
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ratings", error });
  }
};

