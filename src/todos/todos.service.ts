import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Todo from './todos.entity';
import { CreateTodoDto } from './dto/create.dto';
@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository:Repository<Todo>
    ){}

     public async createTodo(todoData:CreateTodoDto):Promise<void>{
        this.todoRepository.save(todoData);
     }

     public async listAllTodos():Promise<Todo[]>{
        return this.todoRepository.find();
     }


     public async getTodoById(todo_id:number):Promise<Todo>{
         return this.todoRepository.findOneOrFail(todo_id)
                    .then(res => res)
                    .catch(error => {
                        throw error;
                    })
     }

     public async updateTodo(todo_id:number,newTodo:CreateTodoDto):Promise<any>{
        return this.todoRepository.update(todo_id,newTodo);
     }

     public async removeTodo(todo_id:number):Promise<number> {
         const removedTodoId = (await this.todoRepository.findOneOrFail(todo_id)).id;
         this.todoRepository.delete(todo_id);
         return removedTodoId;
     }

    
}
