import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import  {UsersModule} from'../users/users.module';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import {  AuthenticationController} from '../authentication/authentication.controller';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  JwtStrategy} from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRATION_TIME}s`,
        },
      }),

    })
    ],
  providers: [AuthenticationService,LocalStrategy,JwtStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
