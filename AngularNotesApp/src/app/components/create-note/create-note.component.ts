import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
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
  }

  // get subNotes() {
  //   return (this.taskForm.controls['subNotes'] as FormArray).controls;
  // }

  // addSubNote() {
  //   const subNotes = this.taskForm.controls['subNotes'] as FormArray;
  //   const newSubNote = this.taskForm.controls['newSubNote'];

  //   subNotes.push(new FormControl(newSubNote.value));
  //   newSubNote.setValue('');
  // }

  // addSubtaskOnEnter(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // Prevent form submission on Enter
  //     this.addSubNote();
  //   }
  // }

  // removeSubtask(index: number) {
  //   const subtasks = this.taskForm.get('subNotes') as any;
  //   subtasks.removeAt(index);
  // }
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
      // subNotes: this.fb.array(note.subNotes),
      // newSubNote: [''],
    });
  }

  initNotewithDummyValue() {
    this.note = {
      id: 0,
      title: '',
      description: '',
      // subNotes: [],
    };
  }
}
