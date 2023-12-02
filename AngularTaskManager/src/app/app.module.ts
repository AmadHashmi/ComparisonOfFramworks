import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TasksListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
