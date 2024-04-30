const User = require('../models/user');

class UserManager {
	async createUser(userData) {
		try {
			const newUser = new User(userData);
			const savedUser = await newUser.save();
			return savedUser;
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
	
	async getUserById(userId) {
		try {
			const user = await User.findById(userId);
			return user;
		} catch (error) {
			throw new Error(`Error getting user by ID: ${error.message}`);
		}
	}
	
	async updateUserById(userId, updateData) {
		try {
			const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
			return updatedUser;
		} catch (error) {
			throw new Error(`Error updating user by ID: ${error.message}`);
		}
	}
	
	async deleteUserById(userId) {
		try {
			const deletedUser = await User.findByIdAndDelete(userId);
			return deletedUser;
		} catch (error) {
			throw new Error(`Error deleting user by ID: ${error.message}`);
		}
	}

}


module.exports = {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
};
