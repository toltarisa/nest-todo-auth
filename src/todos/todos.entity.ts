import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Todo {

  constructor(title:string,content:string,isCompleted:boolean){
    this.title = title;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public title:string;
 
  @Column()
  public content: string;
 
  @Column({default: false})
  public isCompleted:boolean;

 
}

export default Todo;