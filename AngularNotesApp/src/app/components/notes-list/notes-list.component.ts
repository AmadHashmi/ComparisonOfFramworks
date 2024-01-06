import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  constructor(private notesService: NotesService, private router: Router) {}
  ngOnInit(): void {
    this.getAllNotes();
  }

  updateNote(taskId: number): void {
    this.router.navigate(['/create', { id: taskId }]);
  }
  deleteNote(id: number) {
    this.notesService.deleteNote(id);
    this.getAllNotes();
  }

  getAllNotes() {
    this.notesService.getAllNotes().subscribe((notesData) => {
      this.notes = notesData;
    });
  }
}
