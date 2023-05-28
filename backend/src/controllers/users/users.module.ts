import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User, UserSchema } from '../../schemas/User';
import { AuthGuard } from '../../services/authentication/auth/auth.guard';
import { JwtStrategy } from '../../services/authentication/jwt-strategy/jwt-strategy';
import { jwtConfig } from '../../config/jwt.config';
import { UsersController } from './users.controller';
import { UsersService } from '../../services/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, Logger, JwtStrategy],
})
export class UsersModule {}
