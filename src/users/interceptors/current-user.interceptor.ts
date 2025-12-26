import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private authService: AuthService) {}
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session; 
        if (userId) {
            const user = await this.authService.findOne(userId);
            request.currentUser = user;
        }
        return next.handle();
    }
}