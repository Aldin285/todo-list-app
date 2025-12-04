import { Injectable } from '@angular/core';
import { Task } from '../../Models/tasks';
import { TaskStatus } from '../../Models/tasksEnum';
import { CreateTaskDto } from '../../Models/CreateTaskDto';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { TodoAPIService } from '../TodoAPIService/todo-apiservice';
import { TodoStore } from '../../Store/todo-store/todo.store';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  
  constructor(private apiService: TodoAPIService, private todoStore: TodoStore) {
    this.tasks$ = this.todoStore.tasks$;
  }

   tasks$:Observable<Task[]>;

  GetAllTasks() {
    
      this.apiService.GetAllTasksApi().subscribe( 
      (tasks) => this.todoStore.setTasks(tasks)
    );
    console.log("Getting all tasks from API through service");
  }

  AddTaskService(newTask: CreateTaskDto) {
      // 
      this.apiService.AddTaskServiceApi(newTask).subscribe(
      ()=>this.todoStore.addTask(newTask)
    );
  }

  UpdateTitle(id:number, newTitle:string){
    
      this.apiService.UpdateTitleApi(id, newTitle).subscribe(
        ()=>this.todoStore.update(id, newTitle)
      );
  }

  ToggleStatus(id:number) {
    this.apiService.ToggleStatusApi(id).subscribe( 
      ()=>this.todoStore.toggle(id)
    );
    return of(null);
  }

  DeleteTask(id:number) {
    // On ne peut pas utiliser pipe/subscribe car ça ne routourne rien ( retourne void et pas d'observable )
    this.apiService.DeleteTaskApi(id).subscribe( 
      ()=> this.todoStore.remove(id)
    );
    return of(null);
  }



}
