import { AddNoteType } from './addNote'
import { ArrayTagsType } from "./tag";

export type NoteType = AddNoteType & {
    id: number
    isPinned: boolean
    noteTags: ArrayTagsType
}

export type ArrayNotesType = Array<NoteType>

export type StateNotesType = {
    notesList: ArrayNotesType
    notPinnedList: ArrayNotesType
    filteredNotesList: ArrayNotesType
    pinnedNotesList: ArrayNotesType
}