import {User} from './models'; // Assuming User is the model for user schema

class UserManager {
    async createUser(userData: any) {
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
    
    async getUserById(userId: string) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }
    
    async updateUserById(userId: string, updateData: any) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user by ID: ${error}`);
        }
    }
    
    async deleteUserById(userId: string) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Error deleting user by ID: ${error}`);
        }
    }
}

const userManager = new UserManager();

export default userManager;
