import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { RegisterRoutes } from "./routes";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config({ path: __dirname + '\\process.env' });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
); 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
    // Handle successful authentication (e.g., generate a token)
    done(null, profile);
}));


app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

RegisterRoutes(app)