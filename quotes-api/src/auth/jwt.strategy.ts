import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AJSJSJSJ8383USJSJ', // Replace with your actual secret
    });
  }

  async validate(payload: any) {
    console.log('Decoded Payload in JwtStrategy:', payload); // Debug payload
    return { userId: payload.sub, email: payload.email }; // Attach user to req.user
  }  
  
}
