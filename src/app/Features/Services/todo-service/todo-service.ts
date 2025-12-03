import { Injectable } from '@angular/core';
import { Task } from '../../Models/tasks';
import { TaskStatus } from '../../Models/tasksEnum';
import { CreateTaskDto } from '../../Models/CreateTaskDto';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TodoAPIService } from '../TodoAPIService/todo-apiservice';
import { TodoStore } from '../../Store/todo-store/todo.store';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  
  constructor(private apiService: TodoAPIService, private todoStore: TodoStore) {}

  AddTaskService(newTask: CreateTaskDto): Observable<Task> {
    // Return the API Observable so caller (store or component) can subscribe and update state.
    return this.apiService.AddTaskService(newTask).pipe(
      ()=>this.todoStore.addTask(newTask)
    );
  }

  // AddTaskService2(newTask: CreateTaskDto): Observable<Task> {
  //   // Return the API Observable so caller (store or component) can subscribe and update state.
  //   return this.apiService.AddTaskService(newTask).pipe(
  //     ()=>this.storeTask.addTask(newTask)
  //   );
  // }


  UpdateTitle(id:number, newTitle:string): Observable<any> {
    // Return the API observable; the store should subscribe and update local state on success.
    return this.apiService.UpdateTitle(id, newTitle).pipe(
      ()=>this.todoStore.update(id, newTitle)
    );
  }

  ToggleStatus(id:number): Observable<any> {
    // The API service implements this synchronously and returns void; wrap in an observable so callers can subscribe.
    this.apiService.ToggleStatus(id).pipe( 
      ()=>this.todoStore.toggle(id) 
    );
    return of(null);
  }

  DeleteTask(id:number): Observable<any> {
    // The API service deletes synchronously; wrap result in an observable so callers can subscribe.
    this.apiService.DeleteTask(id)
    this.todoStore.remove(id);

    // .pipe(tap(()=>this.taskstore.remove(id)))
    return of(null);
  }



}
