import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {

  taskGroup: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  }) 

  taskCreated(){
    console.log("Nouvelle tache depuis le form "+JSON.stringify(this.taskGroup.value));
  }

}
