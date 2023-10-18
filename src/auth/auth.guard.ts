import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { request } from 'http';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser'; // Import cookie-parser

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  // ExecutionContext is interface built in nestjs
  //Interface describing details about the current request pipeline.
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    //1.The canActivate method is part of a NestJS guard, which is designed to control access to a route or endpoint.
    //2.context: This parameter is automatically provided by NestJS. It represents the execution context for the current request
    //3.getRequest(): This method, when called on the HTTP context, retrieves the HTTP request object. The request object contains information about the incoming HTTP request, including headers, cookies, query parameters, and more.
    //4.context.switchToHttp(): This part of the code is used to switch the context to the HTTP context. In NestJS, there are different contexts for various communication protocols (e.g., HTTP, WebSockets). By using switchToHttp(),
    // you're indicating that you want to work with the HTTP-specific request and response objects.
    // Use cookie-parser middleware to parse cookies
    cookieParser()(request, null, () => {});
    // we can insert it to app module for use in all other module
    // Note that this is a synchronous operation
    // activate middleware // obj that we want to parse , option for middleware ,  This is an empty callback function. The cookieParser middleware might
    // call this function with any errors or warnings, but in this case, it's just an empty function. (it is like next in nodejs)

    const jwtCookie = request.cookies['jwt']; // Assuming the cookie name is 'jwt'

    if (jwtCookie) {
      // You can decode the JWT if needed
      try {
        const decodedToken = this.jwtService.decode(jwtCookie) as {
          [key: string]: any;
        };
        //as { [key: string]: any }: This is a TypeScript type assertion or casting. It tells TypeScript that you expect the result of this.jwtService.decode(jwtCookie) to be an object with keys of type string and values of type any.
        //This casting provides type information to TypeScript, making it aware of the shape of the decoded token.
        let xx = decodedToken.exp;

        const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds
        const currentTime = Date.now(); // Current time in milliseconds
        console.log(currentTime);
        if (currentTime > expirationTime) {
          console.log('Token has expired');
        } else {
          console.log('Token is still valid');
        }

        console.log(xx);
        return true; // Return true if authorized, false if not
      } catch (error) {
        throw new NotFoundException('jwt error');
      }

      // Perform your role-based authorization logic here

      // Return true or false based on your authorization logic
    } else {
      // Handle the case where the 'jwt' cookie is not found
      return false; // For example, return false if authentication failed
    }
  }
}
