import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoController} from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Todo from './todos.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Todo],process.env.POSTGRES_DB)],
  providers: [TodosService],
  controllers:[TodoController]
})
export class TodosModule {}
