import { Injectable } from '@angular/core';
import { Task } from '../../Models/tasks';
import { TaskStatus } from '../../Models/tasksEnum';
import { CreateTaskDto } from '../../Models/CreateTaskDto';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { TodoService } from '../../Services/todo-service/todo-service';
import { TodoAPIService } from '../../Services/TodoAPIService/todo-apiservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$:Observable<Task[]> = this.tasksSubject.asObservable();

  setTasks(tasks: Task[]) {
    this.tasksSubject.next([...tasks]);
  }

  addTask(newTask: CreateTaskDto)  {
//     const curent = [...this.tasksSubject.value];
    // const task: Task = {
    //     id: curent.length > 0 ? Math.max(...curent.map(t => t.id)) + 1 : 1,
    //     nom: newTask.nom,
    //     status: newTask.status
    // };
   
//    this.tasksSubject.next([...curent, task ]);
//     // revoir la valeur de retour
//    return new Observable<Task>(subscriber => {
//         subscriber.next(task);
//         subscriber.complete();
//    });
    console.log("Adding task in store");
  const curent = [...this.tasksSubject.getValue()];

   const task: Task = {
        id: curent.length > 0 ? Math.max(...curent.map(t => t.id)) + 1 : 1,
        nom: newTask.nom,
        status: newTask.status
    };
  
   this.tasksSubject.next([...curent, task ]);
  }

  update(id: number, newTitle: string) {
     console.log("Updating task in store");
    const curent = [...this.tasksSubject.value];
    this.tasksSubject.next(curent.map(t => t.id === id ? { ...t, nom: newTitle } : t));
   
  
  }

  remove(id: number) {
    console.log("Removing task in store");
    const curent = [...this.tasksSubject.value];
    // Renvoie la liste filtrée 
   this.tasksSubject.next(curent.filter(t => t.id !== id));
 
  }

    toggle(id: number){
    console.log("Toggling task in store");
    const curent = [...this.tasksSubject.value];
    this.tasksSubject.next(curent.map(t => t.id === id ? { ...t, status: t.status === TaskStatus.Termine ? TaskStatus.EnCours : TaskStatus.Termine } : t));

    }

//   update(id: number, newTitle: string): void {
//    this.taskService.UpdateTitle(id, newTitle).pipe(take(1)).subscribe({
//      next: (updated) => {
//        const current = this.tasksSubject.getValue();
//        this.tasksSubject.next(current.map(t => t.id === id ? { ...t, nom: newTitle } : t));
//        console.log('Task updated in store', id, newTitle);
//      },
//      error: (err) => console.error('Update title failed', err)
//    });
//   }

//   remove(id: number): void {
//    this.taskService.DeleteTask(id).pipe(take(1)).subscribe({
//      next: () => {
//        const current = this.tasksSubject.getValue();
//        this.tasksSubject.next(current.filter(t => t.id !== id));
//        console.log('Task removed from store', id);
//      },
//      error: (err) => console.error('Delete task failed', err)
//    });

//    this.taskService.DeleteTask(id);
//   }

//   toggle(id: number): void {
//    this.taskService.ToggleStatus(id).pipe(take(1)).subscribe({
//      next: () => {
//          const current = this.tasksSubject.getValue();
//         this.tasksSubject.next(current.map(t => t.id === id ? { ...t, status: t.status === TaskStatus.Termine ? TaskStatus.EnCours : TaskStatus.Termine } : t));
//           console.log('Task toggles in store' );
//         },
//         error: (err) => console.error('Update title failed', err)
//         });
//     }
}
