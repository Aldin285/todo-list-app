import { Injectable } from '@angular/core';
import { Task } from '../../Models/tasks';
import { TaskStatus } from '../../Models/tasksEnum';
import { CreateTaskDto } from '../../Models/CreateTaskDto';
import { BehaviorSubject, delay } from 'rxjs';
import { Observable, of } from 'rxjs';
import { TodoService } from '../todo-service/todo-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoAPIService {
  
// mettre private pour limiter l'accès direct au tableau
  private tasks: Task[] = [
    {id: 1, nom:'Sortir la poubelle', status: TaskStatus.EnCours} ,
    {id: 2, nom:'Faire les courses', status: TaskStatus.Termine} ,
    {id: 3, nom:'Passer l\'aspirateur', status: TaskStatus.Termine} ,
  ];

   nextId: number = 4;

    // Les deux duo
    // Ceci permet de créer une copie de la BDD pour éviter que les users modifient directement le tableau original
    // la valeur par défaut
  private tasksSubject = new BehaviorSubject<Task[]>([...this.tasks]);
  tasks$ = this.tasksSubject.asObservable();


    // plus utilise car la valeur par défaut est déclarée dans la ligne 24
  GetAllTasks(): Observable<Task[]> {
    // important
    // le pipe ?
     return of([...this.tasks]).pipe(delay(300));
  }

  AddTaskService(newTask: CreateTaskDto): Observable<Task> {

    const task: Task = {
      id: this.nextId++,
      nom: newTask.nom,
      status: newTask.status
    };
    
    // this.tasks = [...this.tasks, task];
    this.tasks.push(task);
    // Notifie les changements aux composants qui font appel au tableau
    // this.tasksSubject.next([...this.tasks]);

    // Retourne un observable simulant une requête asynchrone
    return of(task).pipe(delay(300));
  }

  UpdateTitle(id:number, newTitle:string): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.nom = newTitle;
    }

     // Notifie les changements aux composants qui font appel au tableau
    // this.tasksSubject.next([...this.tasks]);

    return of<Task | undefined>(task).pipe(delay(300));
  }

  ToggleStatus(id:number): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      if (task.status === TaskStatus.Termine) {
        task.status = TaskStatus.EnCours ;
      } else {
        task.status = TaskStatus.Termine ;
      }
    }

    return of<Task | undefined>(task).pipe(delay(300));
     // Notifie les changements aux composants qui font appel au tableau
    // this.tasksSubject.next([...this.tasks]);
  }

  DeleteTask(id:number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);

    // Notifie les changements aux composants qui font appel au tableau
    // this.tasksSubject.next([...this.tasks]);
    console.log("Task with id "+id+" deleted.");
    
  }

  
}
