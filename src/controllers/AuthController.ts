import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth';
import passport from '../utils/passport';
import * as jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateJwt';
import User from '../models/user'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password, username} = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            res.status(400).json({message: 'User exists'});
        }
        const registeredUser = await registerUser(email, password, username);
        res.status(201).json(registeredUser); // Send back the created user details (without password)
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' }); // Handle errors gracefully
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        if (!token) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' }); // Handle errors gracefully
    }
};

export const googleAuth = passport.authenticate('google', { session: false });

export const googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        // Passport handles authentication and populates req.user
        const user = req.user as User; // Assumes user object from passport
        const token = generateToken(user.id); // Generate JWT token for the user
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`); // Redirect to frontend with token
    } catch (error) {
        console.error('Error in Google auth callback:', error);
        res.status(500).json({ message: 'Error during Google authentication' });
    }
};

// New route for protected endpoints
export const protectedRoute = async (req: Request, res: Response): Promise<void> => {
    try {
        // Access the authenticated user from the request object
        const user = req.user as User; // Assumes user object from passport
        res.status(200).json({ message: `Welcome, ${user.email}` });
    } catch (error) {
        console.error('Error in protected route:', error);
        res.status(500).json({ message: 'Error accessing protected resource' });
    }
};