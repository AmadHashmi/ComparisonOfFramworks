import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'create', component: CreateNoteComponent },
  { path: 'view/:id', component: CreateNoteComponent },
  { path: 'edit/:id', component: CreateNoteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
