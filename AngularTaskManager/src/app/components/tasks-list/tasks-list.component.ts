import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private tasksService: TaskService, private router: Router) {}
  ngOnInit(): void {
    this.getAllTasks();
  }

  updateTask(taskId: number): void {
    this.router.navigate(['/create', { id: taskId }]);
  }
  deleteTask(id: number) {
    this.tasksService.deleteTask(id);
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAllTasks().subscribe((tasksData) => {
      this.tasks = tasksData;
    });
  }
}
