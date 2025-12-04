import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Task } from '../Models/tasks';
import { TaskStatus } from '../Models/tasksEnum';


@Injectable({
  providedIn: 'root',
})
export class MockApiInterceptor implements HttpInterceptor {

    private tasks: Task[] = [
        { id: 1, nom: 'Sortir la poubelle', status: TaskStatus.EnCours },
        { id: 2, nom: 'Faire les courses', status: TaskStatus.Termine },
        { id: 3, nom: 'Passer l\'aspirateur', status: TaskStatus.Termine },
    ];

    private nextId: number = 4;

    // Extract ID from URL
     private extractId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Get
        if(req.method === 'GET' && req.url.includes('/api/tasks')) {
            console.log("MockApiInterceptor: Intercepted GET /api/tasks");
            return of(new HttpResponse({
                status: 200,
                body: [...this.tasks]
            })).pipe(delay(300));
        }


        // Post
         if(req.method === 'POST' && req.url.includes('/api/tasks')) {
            const newTask = {id: this.nextId++, ...req.body};
            this.tasks.push(newTask);

            console.log("post newTask from mock API:", newTask);

            return of(new HttpResponse({
                status: 201,
                body: newTask
            })).pipe(delay(300));
        }

        // PUT
          // PUT on item: /api/tasks/:id
          if (req.method === 'PUT' && req.url.includes('/api/tasks/')) {
            const id = this.extractId(req.url);
            console.log("put id from mock API:", id);

            const index = this.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...req.body };
            }

            return of(new HttpResponse({
                status: 200,
                body: this.tasks[index]
            })).pipe(delay(300));
          }

        // Patch
          // PATCH on item: /api/tasks/:id
          if (req.method === 'PATCH' && req.url.includes('/api/tasks/')) {
            const id = this.extractId(req.url);
            console.log("patch id from mock API:", id);

            const index = this.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...req.body };
            }

            return of(new HttpResponse({
                status: 200,
                body: this.tasks[index]
            })).pipe(delay(300));
          }


        // Delete
        // DELETE on item: /api/tasks/:id
        if (req.method === 'DELETE' && req.url.includes('/api/tasks/')) {
            const id = parseInt(req.url.split('/').pop() || '', 11);
            this.tasks = this.tasks.filter(t => t.id !== id);

            console.log("delete id from mock API:", id);
            return of(new HttpResponse({
                status: 204,
            })).pipe(delay(300));
        }
    // Laisser passer ce qu’on ne gère pas
    return next.handle(req);
  }
}