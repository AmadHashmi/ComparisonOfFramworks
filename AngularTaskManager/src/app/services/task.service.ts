import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  constructor() {
    this.tasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for task 1',
        subTasks: ['step1', 'step2'],
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for task 2',
        subTasks: ['step1', 'step2'],
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for task 3',
        subTasks: ['step1', 'step2'],
      },
    ];

    this.taskSubject.next(this.tasks);
  }
  getAllTasks(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }
  getSingleTask(id: number): Observable<Task> {
    const task = this.tasks.find((t) => t.id === id);
    return task
      ? new Observable((observer) => observer.next(task))
      : new Observable();
  }
  addTask(newTask: Task): void {
    newTask.id = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push(newTask);
    this.taskSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.taskSubject.next(this.tasks);
  }
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.taskSubject.next(this.tasks);
    }
  }
}
