import { Component, Input, Output } from '@angular/core';
import { TaskStatus } from '../../Models/tasksEnum';
import { Task } from '../../Models/tasks';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  // @Input() titre: string = '';
  // @Input() status: string = '';

  @Input() task: Task = {id:0, nom:'', status: TaskStatus.EnCours};

  @Output() TaskClick = new EventEmitter();
  @Output() ToggleClick = new EventEmitter();
  @Output() EditClick = new EventEmitter();
  @Output() DeleteClick = new EventEmitter();

  EmitTask(){
    this.TaskClick.emit();
    // console.log("Tache cliquée: "+this.titre+"-"+this.status);
  }

  EmitToggle(){
    this.ToggleClick.emit();
  }

  EmitEdit(){
    this.EditClick.emit();
  }

  EmitDelete(){
    this.DeleteClick.emit();
  }

}