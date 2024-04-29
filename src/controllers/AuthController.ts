import passport from 'passport';
import express, {Response, NextFunction } from 'express';
import { Controller, Get, Route, Request } from 'tsoa';

@Route('auth')
export class AuthController extends Controller {
    @Get('google')
    public googleAuth(@Request() request:express.Request): void {
        passport.authenticate('google', { scope: ['profile', 'email'] })(request, request.res, request.next);
    }


    //// Google Callback Endpoint
    //@Get('google/callback')
    ////@Security('google_oauth2', ['profile', 'email'])
    //@SuccessResponse('200', 'Authenticated')
    //public googleCallback(): void {
    //    // Redirect to success page on the frontend
    //    return passport.authenticate('google', { failureRedirect: '/login' })(undefined as any, undefined as any, () => {
    //        this.setStatus(200); // SuccessResponse decorator sets this for us
    //        // You would typically redirect to a frontend URL from here
    //    });
    //}
}