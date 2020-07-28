import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User],process.env.POSTGRES_DB)],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
