import { createModel } from "@rematch/core";
import {
  delay,
  editNoteArrayMutator,
  deleteNoteArrayMutator,
  addNoteArrayMutator,
  createNewNoteId,
  deleteTagFromNoteArrayMutator,
  addTagToNoteArrayMutator,
  filterNotesArrayMutator,
} from "../helpers/utils";
import { initialNote, initialNotesState } from "../helpers/mocks";
import { RootModel } from ".";
import { ArrayNotesType, StateNotesType, NoteType } from "../Types/models/nodes";
import { AddNoteType } from "../Types/models/addNote";
import { ArrayTagsType } from "../Types/models/tag";

type NotesFilterType = {
  activeTags: ArrayTagsType
  searchQuery: string
}

export const notes: any = createModel<RootModel>()({
  state: {
    notesList: initialNote,
    filteredNotesList: initialNote,
    pinnedNotesList: initialNote,
    notPinnedList: initialNote,
  },
  reducers: {
    successLoadNotesList(state: StateNotesType, payload: ArrayNotesType): StateNotesType {
      return {
        notesList: payload,
        notPinnedList: payload.filter(item => !item.isPinned),
        filteredNotesList: payload.filter(item => !item.isPinned),
        pinnedNotesList: payload.filter(item => item.isPinned),
      };
    },
    successAddLoadNote(state: StateNotesType, payload: AddNoteType): StateNotesType {
      const newId = createNewNoteId(state.notesList)
      return {
        ...state,
        notesList: addNoteArrayMutator(state.notesList, payload, newId, 'NotesList'),
        filteredNotesList:  addNoteArrayMutator(state.filteredNotesList, payload, newId, 'filteredNotesList'),
        notPinnedList: addNoteArrayMutator(state.notPinnedList, payload, newId, 'notPinnedList'),
        pinnedNotesList: addNoteArrayMutator(state.pinnedNotesList, payload, newId, 'pinnedNotesList'),
      };
    },
    successEditNote(state: StateNotesType, payload: NoteType): StateNotesType {
      return {
        ...state,
        notesList: editNoteArrayMutator(state.notesList, payload, 'NotesList'),
        filteredNotesList: editNoteArrayMutator(state.filteredNotesList, payload, 'filteredNotesList'),
        notPinnedList: editNoteArrayMutator(state.notPinnedList, payload, 'notPinnedList'),
        pinnedNotesList: editNoteArrayMutator(state.pinnedNotesList, payload, 'pinnedNotesList')
      };
    },
    successDeleteNote(state: StateNotesType, payload: number): StateNotesType {
      return {
        ...state,
        notesList: deleteNoteArrayMutator(state.notesList, payload),
        filteredNotesList: deleteNoteArrayMutator(state.filteredNotesList, payload),
        notPinnedList: deleteNoteArrayMutator(state.notPinnedList, payload),
        pinnedNotesList: deleteNoteArrayMutator(state.pinnedNotesList, payload),
      };
    },
    successPinNote(state: StateNotesType, payload: number): StateNotesType {
      const pinnedNoteIndex = state.notesList.findIndex((el) => el.id === payload)
      return {
        ...state,
        pinnedNotesList: [
          ...state.pinnedNotesList,
          {
            ...state.notesList[pinnedNoteIndex],
            isPinned: true
          }
        ],
        notPinnedList: deleteNoteArrayMutator(state.notPinnedList, payload),
        filteredNotesList:  deleteNoteArrayMutator(state.filteredNotesList, payload)
      };
    },
    successUnPinNote(state: StateNotesType, payload: number): StateNotesType {
      const pinnedNoteIndex = state.notesList.findIndex((el) => el.id === payload)
      return {
        ...state,
        pinnedNotesList: deleteNoteArrayMutator(state.pinnedNotesList, payload),
        notPinnedList: [
          ...state.notPinnedList,
          {
            ...state.notesList[pinnedNoteIndex],
            isPinned: false
          }
        ],
        filteredNotesList: [
        ...state.filteredNotesList,
        {
          ...state.notesList[pinnedNoteIndex],
          isPinned: false
        }
      ],
      };
    },
    successDeleteTagFromNotes(state: StateNotesType, payload: number): StateNotesType {
      return {
        ...state,
        notesList: deleteTagFromNoteArrayMutator(state.notesList, payload),
        notPinnedList: deleteTagFromNoteArrayMutator(state.notPinnedList, payload),
        filteredNotesList: deleteTagFromNoteArrayMutator(state.filteredNotesList, payload),
        pinnedNotesList: deleteTagFromNoteArrayMutator(state.pinnedNotesList, payload),
      };
    },
    successAddTagToNotes(state: StateNotesType, payload: string): StateNotesType {
      return {
        ...state,
        notesList: addTagToNoteArrayMutator(state.notesList, payload),
        notPinnedList: addTagToNoteArrayMutator(state.notPinnedList, payload),
        filteredNotesList: addTagToNoteArrayMutator(state.filteredNotesList, payload),
        pinnedNotesList: addTagToNoteArrayMutator(state.pinnedNotesList, payload),
      };
    },
    successFilterNotes(state: StateNotesType, payload: NotesFilterType): StateNotesType {
      return {
        ...state,
        filteredNotesList: filterNotesArrayMutator(state.notPinnedList, payload.activeTags, payload.searchQuery),
      };
    }
  },
  effects: (dispatch) => {
    const { notes } = dispatch;
    return {
      async load() {
          await delay(500);
          notes.successLoadNotesList(
              initialNotesState
          )
      },
      async addNote(payload: AddNoteType) {
        await delay(300);
          notes.successAddLoadNote(
              payload
          )
      },
      async editNote(payload: NoteType) {
        await delay(300);
        notes.successEditNote(
            payload
        )
      },
      async deleteNote(payload: number) {
        await delay(300);
        notes.successDeleteNote(
            payload
        )
      },
      async pinNote(payload: number) {
        await delay(200);
        notes.successPinNote(
            payload
        )
      },
      async unPinNote(payload: number) {
        await delay(200);
        notes.successUnPinNote(
            payload
        )
      },
      async deleteTagFromNotes(payload: number) {
        await delay(500);
        notes.successDeleteTagFromNotes(
            payload
        )
      },
      async addTagToNotes(payload: string) {
        await delay(500);
        notes.successAddTagToNotes(
            payload
        )
      },
      async filterNotes(payload: NotesFilterType) {
        await delay(700);
        notes.successFilterNotes(
            {
              activeTags: payload.activeTags,
              searchQuery: payload.searchQuery
            }
        )
      }
    };
  }
});
