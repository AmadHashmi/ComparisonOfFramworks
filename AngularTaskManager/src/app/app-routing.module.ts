import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },

  { path: 'create', component: CreateTaskComponent },
  { path: 'update/:id', component: CreateTaskComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
