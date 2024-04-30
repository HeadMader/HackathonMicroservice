import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/hashing';

export const registerUser = async (email: string, username?: string, password?: string): Promise<User> => {
    // Validate and sanitize user data (implement
    let hashedPassword: string = "";
    if (password) {
        hashedPassword = await hashPassword(password);
    }
    try {
        // Replace with actual SQL query for user insertion
        const newUser = await User.create({
            username: username ?? "",
            email: email,
            password: hashedPassword
        });
        return newUser;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Re-throw for handling in controllers
    }
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
    try {
        // Replace with actual SQL query to fetch user by email
        const user = await User.findOne({
            email: email,
        });

        if (!user) {
            return null; // User not found
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return null; // Invalid password
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "", { expiresIn: '1h' }); // Adjust expiration as needed
        return token;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Re-throw for handling in controllers
    }
};