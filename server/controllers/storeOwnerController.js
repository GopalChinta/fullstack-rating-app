// controllers/storeOwnerController.js
export const getStoreDashboard = (req, res) => {
    res.json({ message: `Welcome to the store owner dashboard, ${req.user.id}` });
  };
  