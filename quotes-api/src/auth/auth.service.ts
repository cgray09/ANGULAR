
import * as bcrypt from 'bcrypt';


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { userId: user._id, email: user.email };
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // User not found
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials'); // Password mismatch
    }
  
    // Generate JWT if credentials are valid
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
