import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../Services/todo-service/todo-service';
import { TaskStatus } from '../../Models/tasksEnum';
import { CreateTaskDto } from '../../Models/CreateTaskDto';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {

  taskGroup: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    status: new FormControl(TaskStatus.EnCours),
  }) 


  constructor(private taskService: TodoService) {}
  enCours = TaskStatus.EnCours;
  termine = TaskStatus.Termine;

  

  taskCreated(){
    const newTaskTitle: CreateTaskDto = {
      nom: this.taskGroup.value.title,
      status: this.taskGroup.value.status,
      description: this.taskGroup.value.description};

    this.taskService.AddTaskService(newTaskTitle);
  }

}
