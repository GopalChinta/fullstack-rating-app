import express from "express";
import { createStore, getAllStores } from "../controllers/storeController.js";
import { protect, storeOwnerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a store (Store Owner only)
router.post("/", protect, storeOwnerOnly, createStore);

// Get all stores (Public or any role)
router.get("/", protect, getAllStores);

export default router;

