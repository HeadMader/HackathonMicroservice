"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// Existing Google Authentication Logic (Place this in a more suitable location if needed)
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: (_a = process.env.GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : "",
    clientSecret: (_b = process.env.GOOGLE_CLIENT_SECRET) !== null && _b !== void 0 ? _b : "",
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Handle successful authentication (e.g., generate a token)
    done(null, profile);
}));
let AuthController = class AuthController extends tsoa_1.Controller {
    // Google Login Endpoint
    googleAuth() {
        // Redirect to Google's authentication flow
        return passport_1.default.authenticate('google', { scope: ['profile', 'email'] })(undefined, undefined);
    }
    // Google Callback Endpoint
    googleCallback() {
        // Redirect to success page on the frontend
        return passport_1.default.authenticate('google', { failureRedirect: '/login' })(undefined, undefined, () => {
            this.setStatus(200); // SuccessResponse decorator sets this for us
            // You would typically redirect to a frontend URL from here
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Get)('google'),
    (0, tsoa_1.Security)('google_oauth2', ['profile', 'email']) // Assuming you set up security
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, tsoa_1.Get)('google/callback'),
    (0, tsoa_1.Security)('google_oauth2', ['profile', 'email']),
    (0, tsoa_1.SuccessResponse)('200', 'Authenticated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)('auth')
], AuthController);
//# sourceMappingURL=AuthController.js.map