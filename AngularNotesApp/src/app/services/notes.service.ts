import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];
  private noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(
    []
  );
  constructor() {
    // this.notes = [
    //   {
    //     id: 1,
    //     title: 'Note 1',
    //     description: 'Description for note 1',
    //     // subTasks: ['step1', 'step2'],
    //   },
    //   {
    //     id: 2,
    //     title: 'Note 2',
    //     description: 'Description for note 2',
    //     // subTasks: ['step1', 'step2'],
    //   },
    //   {
    //     id: 3,
    //     title: 'Note 3',
    //     description: 'Description for note 3',
    //     // subTasks: ['step1', 'step2'],
    //   },
    // ];

    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
      this.noteSubject.next(this.notes);
    } else {
      this.notes = [];
    }

    // this.noteSubject.next(this.notes);
  }
  // getAllNotes(): Observable<Note[]> {
  //   return this.noteSubject.asObservable();
  // }
  // getSingleNote(id: number): Observable<Note> {
  //   const note = this.notes.find((t) => t.id === id);
  //   return note
  //     ? new Observable((observer) => observer.next(note))
  //     : new Observable();
  // }
  // addNote(newNote: Note): void {
  //   newNote.id = this.notes[this.notes.length - 1].id + 1;
  //   this.notes.push(newNote);
  //   this.noteSubject.next(this.notes);
  // }

  // deleteNote(id: number): void {
  //   this.notes = this.notes.filter((note) => note.id !== id);
  //   this.noteSubject.next(this.notes);
  // }
  // updateNote(updatedNote: Note): void {
  //   const index = this.notes.findIndex((note) => note.id === updatedNote.id);
  //   if (index !== -1) {
  //     this.notes[index] = updatedNote;
  //     this.noteSubject.next(this.notes);
  //   }
  // }

  getAllNotes(): Observable<Note[]> {
    return this.noteSubject.asObservable();
  }

  getSingleNote(id: number): Observable<Note> {
    const note = this.notes.find((t) => t.id === id);
    return note
      ? new Observable((observer) => observer.next(note))
      : new Observable();
  }

  addNote(newNote: Note): void {
    newNote.id =
      this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1;
    this.notes.push(newNote);
    this.updateLocalStorage();
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.updateLocalStorage();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.noteSubject.next(this.notes);
  }
}
