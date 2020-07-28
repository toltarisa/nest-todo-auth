import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    private readonly configService: ConfigService
      ) {}

      public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword
            });

            return createUser;
        } catch (error) {
                if(error?.code === PostgresErrorCode.UniqueViolation ) {
                    throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
                }
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR); 
        }
      }

      public async getAuthenticatedUser(email:string,hashedPassword: string) {
          try {
              const user = await this.usersService.getByEmail(email);
              const isPasswordsMatching = await bcrypt.compare( 
                  hashedPassword,user.password
              );
              if(!isPasswordsMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
              }
              user.password = undefined;
              return user;
          } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
      }

      public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
      }

      public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }

      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }
}
