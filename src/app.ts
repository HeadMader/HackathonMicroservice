import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import passport from './utils/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { register, login, protectedRoute } from './controllers/authController'
dotenv.config({ path: __dirname + '\\process.env' });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize()); 
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

// Protected route requiring authentication
app.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute); // Use JWT strategy

app.post('/register', register);
app.post('/login', login);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});