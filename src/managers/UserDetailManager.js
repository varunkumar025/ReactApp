const User = require('../model/UserDetails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/config'); // Load secret key from config file


const getAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, phone: 1 }); // Only fetch necessary fields
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
const checkCredentials = async (email, password) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        const token = jwt.sign({ userId: user._id, email: user.email, phone: user.phone, userType: user.userType }, secretKey);
        return { success: true, message: 'Login successful', token, userType: user.userType };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw new Error('Internal server error');
    }
  };
  const registerUser = async (name, password, email, phone, userType = 'Regular', profile) => {
    try {
        
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            throw new Error('User already exists');
        }

       
        const token = jwt.sign({ email, userType }, 'your-secret-key', { expiresIn: '36500d' });

        
        const newUser = new User({
            name,
            email,
            password,
            phone,
            userType,
            token,
            profile  
        });

        
        await newUser.save();

        return { user: newUser, token };
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user');
    }
};


  
const getUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by email: ${error.message}`);
  }
};
  
 
  const updateUserById = async (userId, userData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user by ID: ${error.message}`);
    }
  };
  

  const deleteUserById = async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error(`Failed to delete user by ID: ${error.message}`);
    }
  };
  const updateUserProfileImage = async (userEmail, profileImageUrl, phone) => {
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update user's profile image URL and phone number
      user.profileImageUrl = profileImageUrl;
      user.phone = phone; // Assuming 'phone' is a required field
      
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Failed to update profile image: ${error.message}`);
    }
  };
  

module.exports = {
  getAllUsers,
  checkCredentials, registerUser, getUserByEmail,
  updateUserById,
  deleteUserById,
  updateUserProfileImage
};
