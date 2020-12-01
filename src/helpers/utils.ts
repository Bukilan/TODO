import {NoteType, ArrayNotesType} from "../Types/models/nodes";
import {AddNoteType} from "../Types/models/addNote";
import {ArrayTagsType, TagType} from "../Types/models/tag";

type ArrayType = 'NotesList' | 'filteredNotesList' | 'pinnedNotesList' | 'notPinnedList'

export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const getNoteById = (state: ArrayNotesType, id: number) => {
    return state.findIndex((el) => el.id === id);
}

export const editNoteArrayMutator = (state: ArrayNotesType, payload: NoteType, type: ArrayType) => {
    const index = getNoteById(state, payload.id)
    const newList = [...state]
    if (index >= 0) {
        newList[index] = {
            ...payload
        }
    }

    switch (type) {
        case "NotesList":
            return newList
        case "filteredNotesList":
            if (payload.isPinned) return state
            return newList
        case "notPinnedList":
            if (payload.isPinned) return state
            return newList
        case "pinnedNotesList":
            if (!payload.isPinned) return state
            return newList
        default:
            return state
    }
}

export const DeleteNoteArrayMutator = (state: ArrayNotesType, id: number) => {
    const index = getNoteById(state, id)
    console.log(index)
    if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
    } else return  state
}


export const AddNoteArrayMutator = (state: ArrayNotesType, payload: AddNoteType, newId: number, type: ArrayType) => {
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
            if (payload.isPinned) return state
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

export const createNewId = (state: ArrayNotesType) => {
    return Math.max(...state.map(item => item.id)) + 1
}

export const getTagById = (state: ArrayTagsType, id: number) => {
    return state.findIndex((el) => el.id === id);
}

export const changeTagStatus = (state: ArrayTagsType, id: number) => {
    const index = getTagById(state, id)
    const newList = [...state]
    if (index >= 0) {
        newList[index] = {
            ...newList[index],
            isActive: !newList[index].isActive
        }
    }
    return newList
}

export const DeleteTagArrayMutator = (state: ArrayTagsType, id: number) => {
    const index = getTagById(state, id)
    if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
    } else return  state
}

export const createNewTagId = (state: ArrayTagsType) => {
    return Math.max(...state.map(item => item.id)) + 1
}

export const AddTagArrayMutator = (state: ArrayTagsType, name: string) => {
    const newArr = [
        ...state,
        {
            id: createNewTagId(state),
            name,
            isActive: false,
        }
    ]
    return newArr
}