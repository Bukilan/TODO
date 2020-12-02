import { ArrayNotesType, NoteType } from "../Types/models/nodes";
import { AddNoteType } from "../Types/models/addNote";
import { ArrayTagsType } from "../Types/models/tag";

type ArrayType = 'NotesList' | 'filteredNotesList' | 'pinnedNotesList' | 'notPinnedList'

export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const getNoteIndexById = (state: ArrayNotesType, id: number): number => {
    return state.findIndex((el) => el.id === id);
}

export const editNoteArrayMutator = (state: ArrayNotesType, payload: NoteType, type: ArrayType): ArrayNotesType => {
    const index = getNoteIndexById(state, payload.id)
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

export const deleteNoteArrayMutator = (state: ArrayNotesType, id: number): ArrayNotesType => {
    const index = getNoteIndexById(state, id)
    if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
    } else return  state
}


export const addNoteArrayMutator = (state: ArrayNotesType, payload: AddNoteType, newId: number, type: ArrayType): ArrayNotesType => {
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

export const deleteTagFromNoteArrayMutator = (state: ArrayNotesType, payload: number): ArrayNotesType => {
    return state.map(item => {
        return {
            ...item,
            noteTags: deleteTagArrayMutator(item.noteTags, payload)
        }
    })
}

export const addTagToNoteArrayMutator = (state: ArrayNotesType, payload: string): ArrayNotesType => {
    return state.map(item => {
        return {
            ...item,
            noteTags: addTagArrayMutator(item.noteTags, payload)
        }
    })
}

export const filterNotesArrayMutator = (state: ArrayNotesType, tags: ArrayTagsType, searchQuery: string): ArrayNotesType => {
    const searchedNotes = state.filter(item => item.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    const tagsNotes: ArrayNotesType = []
    state.map(note => {
        const isFound = note.noteTags.find(noteTag => {
            return tags.find(tag => noteTag.id === tag.id && noteTag.isActive)
        })
       if (isFound) tagsNotes.push(note)
    })

    const concatNotes = [...searchedNotes, ...tagsNotes]

    const result: ArrayNotesType = []
    concatNotes.forEach(item => {
        if (getNoteIndexById(searchedNotes, item.id) !== -1 && getNoteIndexById(tagsNotes, item.id) !== -1 &&  getNoteIndexById(result, item.id) === -1) {
            result.push(item)
        }
    })

    if (!tags.length) {
        return searchedNotes
    }

    if (!searchQuery) {
        return tagsNotes
    }

    return result
}

export const createNewNoteId = (state: ArrayNotesType): number => {
    return Math.max(...state.map(item => item.id)) + 1
}

export const getTagIndexById = (state: ArrayTagsType, id: number): number => {
    return state.findIndex((el) => el.id === id);
}

export const changeTagStatus = (state: ArrayTagsType, id: number): ArrayTagsType => {
    const index = getTagIndexById(state, id)
    const newList = [...state]
    if (index >= 0) {
        newList[index] = {
            ...newList[index],
            isActive: !newList[index].isActive
        }
    }
    return newList
}

export const deleteTagArrayMutator = (state: ArrayTagsType, id: number): ArrayTagsType => {
    const index = getTagIndexById(state, id)
    if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
    } else return  state
}

export const createNewTagId = (state: ArrayTagsType): number => {
    return Math.max(...state.map(item => item.id)) + 1
}

export const addTagArrayMutator = (state: ArrayTagsType, name: string): ArrayTagsType => {
    return [
        ...state,
        {
            id: createNewTagId(state),
            name,
            isActive: false,
        }
    ]
}