import { Component, inject } from '@angular/core';
import { Task } from '../../Models/tasks';
import { TaskStatus } from '../../Models/tasksEnum';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../../Services/todo-service/todo-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateTaskDto } from '../../Models/CreateTaskDto';
import { TodoAPIService } from '../../Services/TodoAPIService/todo-apiservice';
import { TodoStore } from '../../Store/todo-store/todo.store';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem, AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {

  task: {nom: string, status: string}[] = [
    {nom:'Sortir la poubelle', status:'En cours'},
    {nom:'Faire les courses', status:'Termine'},
    {nom:'Passer l\'aspirateur', status:'Termine'},
  ]; 

  // Version meilleur
  tasks2 : Task[] = [
    {id: 1, nom:'Sortir la poubelle', status: TaskStatus.EnCours},
    {id: 2, nom:'Faire les courses', status: TaskStatus.Termine},
    {id: 3, nom:'Passer l\'aspirateur', status: TaskStatus.Termine},
  ];

  tableauDeTaches: Task[] = [];

  AddTask(){
    const newTask: Task = {id: 4, nom: 'Nouvelle tache', status: TaskStatus.EnCours};
    this.tableauDeTaches.push(newTask);
  }
// ----------------------------------------------------------------------------
  // Ex4 Display function due to an emit
  Display( id: number){
    console.log("Emitted item with id : "+id);
  }
  
  Toggle(id: number){
    
    // this.taskService.ToggleStatus(id);
    this.taskService.ToggleStatus(id);
  }

  Update(id: number, newTitle: string){
    // console.log("Update clicked for item with id : "+id+" to new title : "+newTitle);

    // this.taskService.UpdateTitle(id, newTitle);

      //Appel du store
    this.taskService.UpdateTitle(id, newTitle); 
  }

  Delete(id: number){
    // console.log("Delete clicked for item with id : "+id);
    // this.taskService.DeleteTask(id);

       //Appel du store
    this.taskService.DeleteTask(id); 
  }

  Add(newTask : CreateTaskDto){
    // this.taskService.AddTaskService(newTask);

      //Appel du store
    this.taskService.AddTaskService(newTask);

  }
  termine = TaskStatus.Termine;
  encours = TaskStatus.EnCours;

  // ----------------------------------------------------------------------------
  // Ex5 + Ex6
  serviceTasks: Task[] =  [];
  // todoService = inject(TodoService);
  
    //liste des taches 
  // tasks$ : Observable<Task[]>;
  tasksStore$ : Observable<Task[]>;

  // ----------------------------------------------------------------------------
  // Ex7+8
  // Injection de dépendances
  constructor(private taskApiService: TodoAPIService, private taskService: TodoService, private todoStore: TodoStore){
      // On l'utilise plus car on prend les données du store
    // this.tasks$ = this.taskApiService.tasks$;

    this.tasksStore$ = this.todoStore.tasks$;

    this.todoStore.setTasks([
    {id: 1, nom:'Sortir la poubelle', status: TaskStatus.EnCours} ,
    {id: 2, nom:'Faire les courses', status: TaskStatus.Termine} ,
    {id: 3, nom:'Passer l\'aspirateur', status: TaskStatus.Termine} ,
  ])

  }
 

}
