import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './Features/Components/todo-list/todo-list';
import { TodoItem } from './Features/Components/todo-item/todo-item';
import { TaskStatus } from './Features/Models/tasksEnum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
}
