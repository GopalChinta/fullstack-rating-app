import Store from "../models/Store.js";

// @desc    Create new store
// @route   POST /api/stores
export const createStore = async (req, res) => {
  try {
    const { name, description } = req.body;

    const store = new Store({
      name,
      description,
      owner: req.user._id,
    });

    await store.save();
    res.status(201).json({ message: "Store created successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all stores
// @route   GET /api/stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("owner", "name email");
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stores", error });
  }
};
