import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register the passport JWT strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'AJSJSJSJ8383USJSJ', // Use env variable or fallback key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule], // Export JwtAuthGuard for other modules
})
export class AuthModule {}
