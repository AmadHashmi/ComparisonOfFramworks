import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subTasks: this.fb.array([]),
      newSubTask: [''],
    });
  }

  get subTasks() {
    return (this.taskForm.controls['subTasks'] as FormArray).controls;
  }

  addSubTask() {
    const subTasks = this.taskForm.controls['subTasks'] as FormArray;
    const newSubTask = this.taskForm.controls['newSubTask'];

    subTasks.push(new FormControl(newSubTask.value));
    newSubTask.setValue('');
  }

  addSubtaskOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter
      this.addSubTask();
    }
  }

  removeSubtask(index: number) {
    const subtasks = this.taskForm.get('subTasks') as any;
    subtasks.removeAt(index);
  }
  createTask() {
    if (this.taskForm.invalid) {
      return;
    }
    // Handle the creation of the task (you can implement your logic here)
    console.log('Task Created:', this.taskForm.value);
    this.router.navigate(['']);
  }
}
