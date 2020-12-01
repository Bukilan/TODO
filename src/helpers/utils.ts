import {NoteType, ArrayNotesType} from "../Types/models/nodes";
import {AddNoteType} from "../Types/models/addNote";

export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const getNoteById = (state: ArrayNotesType, id: number) => {
    return state.findIndex((el) => el.id === id);
}

export const editNoteArrayMutator = (state: ArrayNotesType, payload: NoteType) => {
    const index = getNoteById(state, payload.id)
    const newList = [...state]
    if (index >= 0) {
        newList[index] = {
            ...payload
        }
    }
    return newList
}

export const DeleteNoteArrayMutator = (state: ArrayNotesType, id: number) => {
    const index = getNoteById(state, id)
    console.log(index)
    if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
    } else return  state
}


export const AddNoteArrayMutator = (state: ArrayNotesType, payload: AddNoteType, newId: number, type: 'NotesList' | 'filteredNotesList' | 'pinnedNotesList' | 'notPinnedList') => {
    const newArr = [
        ...state,
        {
            id: newId,
            ...payload
        }
    ]
    switch (type) {
        case "NotesList":
            return newArr
        case "filteredNotesList":
            return newArr
        case "notPinnedList":
            if (payload.isPinned) return state
            return newArr
        case "pinnedNotesList":
            if (!payload.isPinned) return state
            return newArr
        default:
            return state
    }
}