// controllers/adminController.js
export const getAdminDashboard = (req, res) => {
    res.json({ message: `Welcome to the admin dashboard, ${req.user.id}` });
  };
  