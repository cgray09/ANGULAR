import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Authorization Header:', request.headers.authorization); // Debug token
    return super.canActivate(context);
  }

  handleRequest(err: Error | null, user: any, info: any) {
    console.log('Error in Guard:', err); // Log any error
  console.log('Info in Guard:', info); // Log info (e.g., expired token)
  console.log('User in Guard:', user); // Log the decoded user object

  if (err || !user) {
    throw err || new UnauthorizedException('Unauthorized access');
  }
  return user; // Attach user to req.user
  }
}
