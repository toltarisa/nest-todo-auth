import { Body,  Controller,  Post, UseGuards, Get, Param,Put, Delete } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import Todo from '../todos/todos.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,ApiBody
  } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todo')
export class TodoController {

    constructor(
        private readonly todoService: TodosService
    ){}
    
    @ApiBody({type:'object',required:true,schema: {properties: {
        "id":{type:'number'},
        "title": {type:'string'},
        "content":{type:'string'},
        "isCompleted": {type:'boolean'}
    }}})
    @ApiOperation({ summary: 'Create todo' })
    @ApiResponse({ status: 201, description: 'Created' })
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    public async createTodo(@Body() todoData:CreateTodoDto):Promise<void>{
        this.todoService.createTodo(todoData);
    }

    @ApiOperation({ summary: 'Get list of all todos' })
    @ApiResponse({ status: 200, description: 'success.' })
    @Get()
    @UseGuards(JwtAuthenticationGuard)
    public async listAllTodos():Promise<Todo[]>{
        return this.todoService.listAllTodos();
    }

    @ApiOperation({ summary: 'Get a todo by id' })
    @ApiResponse({ status: 200, description: 'success.' })
    @Get(':id')
    @UseGuards(JwtAuthenticationGuard)
    public async getTodoById(@Param() id:number):Promise<Todo> {
        return this.todoService.getTodoById(id);
    }

    @ApiOperation({ summary: 'Update a todo resource by id ' })
    @ApiResponse({ status: 204, description: 'Updated.' })
    @Put(':id')
    @UseGuards(JwtAuthenticationGuard)
    public async updateTodo(@Param() id:number,@Body() newTodo:CreateTodoDto):Promise<any>{
        return this.todoService.updateTodo(id,newTodo);
    }

    @ApiOperation({ summary: 'Remove a todo resource' })
    @ApiResponse({ status: 200, description: 'success' })
    @Delete(':id')
    @UseGuards(JwtAuthenticationGuard)
    public async deleteTodo(@Param() id:number):Promise<number> {
        return this.todoService.removeTodo(id);
    }
}