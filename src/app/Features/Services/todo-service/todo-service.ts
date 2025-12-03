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
  
  constructor(private apiService: TodoAPIService, private todoStore: TodoStore) {}

  AddTaskService(newTask: CreateTaskDto) {
    // Return the API Observable so caller (store or component) can subscribe and update state.
     this.apiService.AddTaskService(newTask).subscribe(
    ()=>this.todoStore.addTask(newTask)
  );
}

  // AddTaskService2(newTask: CreateTaskDto): Observable<Task> {
  //   // Return the API Observable so caller (store or component) can subscribe and update state.
  //   return this.apiService.AddTaskService(newTask).pipe(
  //     ()=>this.storeTask.addTask(newTask)
  //   );
  // }


  UpdateTitle(id:number, newTitle:string){
      this.apiService.UpdateTitle(id, newTitle).subscribe(
        () =>{
          this.todoStore.update(id, newTitle);
        }
      )
    //   .pipe(
    //   tap(()=>this.todoStore.update(id, newTitle))
    // );
    // this.todoStore.update(id, newTitle)
  }

  ToggleStatus(id:number) {
    this.apiService.ToggleStatus(id).subscribe( 
      ()=>this.todoStore.toggle(id)
    );
    return of(null);
  }

  DeleteTask(id:number) {
    // On ne peut pas utiliser le pipe car ça ne routourne rien ( retourne void et pas d'observable )
    this.apiService.DeleteTask(id)
    this.todoStore.remove(id);

    // .pipe(tap(()=>this.taskstore.remove(id)))
    return of(null);
  }



}
