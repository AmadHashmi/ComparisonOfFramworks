import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent {
  updateNote = false;
  viewNote = false;
  taskForm!: FormGroup;
  note!: Note;
  constructor(
    private notesService: NotesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const taskId = +params['id'];
      if (taskId) {
        this.updateNote = true;
        this.notesService.getSingleNote(taskId).subscribe((data) => {
          data!.id = taskId;
          this.note = data;

          this.initForm(data!);
        });
      } else {
        this.initNotewithDummyValue();
        this.initForm(this.note);
        this.updateNote = false;
      }
    });
    if (
      !(this.router.url.includes('create') || this.router.url.includes('edit'))
    ) {
      this.taskForm.disable();
      this.viewNote = true;
    }
  }

  createNote() {
    if (this.taskForm.invalid) {
      return;
    }

    const { newSubtask, ...newNoteWithoutNewSubtask } = this.taskForm.value;
    if (this.updateNote) {
      newNoteWithoutNewSubtask.id = this.note.id;
      this.notesService.updateNote(newNoteWithoutNewSubtask);
      this.router.navigate(['']);
    } else {
      this.notesService.addNote(newNoteWithoutNewSubtask);
      this.router.navigate(['']);
    }
  }

  initForm(note: Note) {
    this.taskForm = this.fb.group({
      title: [note.title, Validators.required],
      description: [note.description, Validators.required],
    });
  }

  initNotewithDummyValue() {
    this.note = {
      id: 0,
      title: '',
      description: '',
    };
  }
}
