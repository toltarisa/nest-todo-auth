import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
import { Repository } from 'typeorm';
import CreateUserDto from '../authentication/dto/createUser.dto';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>
    ) {}

    async getByEmail(email:string):Promise<User> {
        const user = this.usersRepository.findOne({email});
        if(user) {
            return user;
        }
        throw new HttpException("User with this email doesnt exist",HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto):Promise<User>{
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async getById(id: number):Promise<User> {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
          return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
      }
}
