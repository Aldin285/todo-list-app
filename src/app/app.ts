import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './Features/Components/todo-list/todo-list';
import { TodoItem } from './Features/Components/todo-item/todo-item';
import { TaskStatus } from './Features/Models/tasksEnum';
import { TodoForm } from './Features/Components/todo-form/todo-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoList, TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
}
