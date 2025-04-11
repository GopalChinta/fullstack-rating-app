// controllers/userController.js
export const getUserDashboard = (req, res) => {
    res.json({ message: `Welcome to the user dashboard, ${req.user.id}` });
  };
  