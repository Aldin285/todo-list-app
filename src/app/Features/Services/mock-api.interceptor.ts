import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MockApiInterceptor implements HttpInterceptor {

    private tasks = [
        { id: 1, nom: 'Sortir la poubelle', status: 'EnCours' },
        { id: 2, nom: 'Faire les courses', status: 'Termine' },
        { id: 3, nom: 'Passer l\'aspirateur', status: 'Termine' },
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method === 'GET' && req.url.endsWith('/api/tasks')) {
            return of(new HttpResponse({
                status: 200,
                body: [...this.tasks]
            })).pipe(delay(300));
        }

         if(req.method === 'POST' && req.url.endsWith('/api/tasks')) {
            const newTask = {id: Date.now(), ...req.body};
            this.tasks.push(newTask);

            return of(new HttpResponse({
                status: 201,
                body: newTask
            })).pipe(delay(300));
        }

          if(req.method === 'PATCH' && req.url.endsWith('/api/tasks')) {
            const id = parseInt(req.url.split('/').pop() || '', 11);
            const index = this.tasks.findIndex(t => t.id === id);
            if(index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...req.body };
            }
            return of(new HttpResponse({
                status: 201,
                body: this.tasks[index]
            })).pipe(delay(300));
        }

        if(req.method === 'DELETE' && req.url.endsWith('/api/tasks/')) {
            const id = parseInt(req.url.split('/').pop() || '', 11);
            this.tasks = this.tasks.filter(t => t.id !== id);

            return of(new HttpResponse({
                status: 204,
            })).pipe(delay(300));
        }
    // Laisser passer ce qu’on ne gère pas
    return next.handle(req);
  }
}