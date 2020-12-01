import { AddNoteType } from './addNote'

export type NoteType = AddNoteType & {
    id: number,
    isPinned: boolean
}

export type ArrayNotesType = Array<NoteType>

export type StateNotesType = {
    notesList: ArrayNotesType
    notPinnedList: ArrayNotesType
    filteredNotesList: ArrayNotesType
    pinnedNotesList: ArrayNotesType
}