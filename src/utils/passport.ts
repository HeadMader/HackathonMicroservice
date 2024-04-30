import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithRequest, StrategyOptions } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from "mongoose";
import User from '../models/user';
import { registerUser, loginUser } from '../services/auth';

// JWT strategy (same as previous response)
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET ?? "sDHfislhsdffhsli"
};

passport.use(new JwtStrategy(jwtOptions, async (payload: { userId: number }, done) => {
    try {

        const user = await User.findOne({ id: payload.userId });

        if (!user) {
            return done(null, false);
        }
        // Pass the user object to the request object for further use
        return done(null, user);
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return done(error);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? "217503700262-aju1h9f77m45liiupubmg8oubhj8ss52.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "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",
    callbackURL: '/api/auth/google/callback', // Replace with your callback URL
    scope: ['profile', 'email'], // Request user profile and email information
}, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            // Create a new user if they don't exist
            let email = profile.emails[0].value;

            user = await registerUser(email, email);
        }

        done(null, user); // Pass the user object to the request object
    } catch (error) {
        console.error('Error using Google OAuth:', error);
        done(error);
    }
}));

export default passport;