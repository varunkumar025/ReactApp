const userManager = require('../managers/UserDetailManager');
const generateToken = require("../middleware/generateToken");

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userManager.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const checkCredentials = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const result = await userManager.checkCredentials(email, password);
      if (result.success) {
        res.status(200).json({ status: 'success', message: result.message, ...result });
      } else {
        res.status(401).json({ status: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error'});
    }
  };
  const registerUser = async (req, res) => {
    const { name, password, email, phone, userType, profile } = req.body;
    console.log(req.body);
    try {
      // Call userManager to register a new user
      const { user, token } = await userManager.registerUser(name, password, email, phone, userType,profile);
  
      // User registration successful
      res.status(201).json({ status: 'success', message: 'User created successfully', data: { user, token } });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Validation error occurred
        const invalidField = Object.keys(error.errors)[0];
        const errorMessage = error.errors[invalidField].message;
        return res.status(400).json({ status: 'error', message: errorMessage });
      } else {
        // Other error occurred (e.g., database error)
        console.error('Error registering user:', error);
        res.status(500).json({ status: 'error', message: 'Failed to register user' });
      }
    }
  };
  
  
  const getUserById = async (req, res) => {
    const { userEmail } = req.params;
    try {
      const user = await userManager.getUserByEmail(userEmail);
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const updateProfileImage = async (req, res) => {
    const { userEmail } = req.params;
    const { profileImageUrl } = req.body;
  
    try {
      // Call userManager function to update the profile image
      const updatedUser = await userManager.updateUserProfileImage(userEmail, profileImageUrl);
  
      // Return the updated user object in the response
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  // Controller function to update user by ID
  const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    try {
      const updatedUser = await userManager.updateUserById(userId, userData);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Controller function to delete user by ID
  const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await userManager.deleteUserById(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send(); // No content response
    } catch (error) {
      console.error('Error deleting user by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports = {
  getAllUsers,checkCredentials, registerUser,getUserById,
  updateUserById,
  deleteUserById,
  updateProfileImage
};
