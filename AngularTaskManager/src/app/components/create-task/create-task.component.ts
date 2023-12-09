import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  updateTask = false;
  taskForm!: FormGroup;
  task!: Task;
  constructor(
    private tasksService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const taskId = +params['id'];
      if (taskId) {
        this.updateTask = true;
        this.tasksService.getSingleTask(taskId).subscribe((data) => {
          data!.id = taskId;
          this.task = data;

          this.initForm(data!);
        });
      } else {
        this.initTaskwithDummyValue();
        this.initForm(this.task);
        this.updateTask = false;
      }
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

    const { newSubtask, ...newTaskWithoutNewSubtask } = this.taskForm.value;
    if (this.updateTask) {
      newTaskWithoutNewSubtask.id = this.task.id;
      this.tasksService.updateTask(newTaskWithoutNewSubtask);
      this.router.navigate(['']);
    } else {
      this.tasksService.addTask(newTaskWithoutNewSubtask);
      this.router.navigate(['']);
    }
  }

  initForm(task: Task) {
    this.taskForm = this.fb.group({
      title: [task.title, Validators.required],
      description: [task.description, Validators.required],
      subTasks: this.fb.array(task.subTasks),
      newSubTask: [''],
    });
  }

  initTaskwithDummyValue() {
    this.task = {
      id: 0,
      title: '',
      description: '',
      subTasks: [],
    };
  }
}
