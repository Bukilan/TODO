import { AddNoteType } from './addNote'

export type NoteType = AddNoteType & {
    id: number,
}

export type NotesType = Array<NoteType>

export type NotesStateType = {
    notesList: NotesType
    filteredNotesList: NotesType
}