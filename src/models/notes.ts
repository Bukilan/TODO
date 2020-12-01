import { createModel } from "@rematch/core";
import {delay, editNoteArrayMutator, DeleteNoteArrayMutator, AddNoteArrayMutator, getNoteById} from "../helpers/utils";
import { RootModel } from ".";
import { ArrayNotesType, StateNotesType, NoteType } from "../Types/models/nodes";
import { AddNoteType } from "../Types/models/addNote";


const initialNotesState: ArrayNotesType = [
    {
      id: 1,
      title: 'title1',
      description: 'desc1',
      isPinned: false,
    },
    {
      id: 2,
      title: 'title2',
      description: 'desc2',
      isPinned: false,
    },
    {
      id: 3,
      title: 'title3',
      description: 'desc3',
      isPinned: false,
    },
    {
      id: 4,
      title: 'Закрелённый ноут',
      description: 'ЛЛАЛЛАЛАЛАААЛАЛА',
      isPinned: true,
    },
]

export const notes: any = createModel<RootModel>()({
  state: {
    notesList: [],
    filteredNotesList: [],
    pinnedNotesList: [],
    notPinnedList: [],
  },
  // @ts-ignore
  reducers: {
    successLoadNotesList(state: StateNotesType, payload: ArrayNotesType): StateNotesType {
      return {
        ...state,
        notesList: payload,
        notPinnedList: payload.filter(item => !item.isPinned),
        filteredNotesList: payload.filter(item => !item.isPinned),
        pinnedNotesList: payload.filter(item => item.isPinned),
      };
    },
    successAddLoadNote(state: StateNotesType, payload: AddNoteType): StateNotesType {
      const newId = state.notesList.length ?  state.notesList[state.notesList.length - 1].id + 1 : 1
      return {
        ...state,
        notesList: AddNoteArrayMutator(state.notesList, payload, newId, 'NotesList'),
        filteredNotesList:  AddNoteArrayMutator(state.filteredNotesList, payload, newId, 'filteredNotesList'),
        notPinnedList: AddNoteArrayMutator(state.notPinnedList, payload, newId, 'notPinnedList'),
        pinnedNotesList: AddNoteArrayMutator(state.pinnedNotesList, payload, newId, 'pinnedNotesList'),
      };
    },
    successEditNote(state: StateNotesType, payload: NoteType): StateNotesType {
      return {
        ...state,
        notesList: editNoteArrayMutator(state.notesList, payload),
        filteredNotesList: editNoteArrayMutator(state.filteredNotesList, payload),
        notPinnedList: editNoteArrayMutator(state.filteredNotesList, payload),
        pinnedNotesList: editNoteArrayMutator(state.pinnedNotesList, payload)
      };
    },
    successDeleteNote(state: StateNotesType, payload: number): StateNotesType {
      return {
        ...state,
        notesList: DeleteNoteArrayMutator(state.notesList, payload),
        filteredNotesList: DeleteNoteArrayMutator(state.filteredNotesList, payload),
        notPinnedList: DeleteNoteArrayMutator(state.notPinnedList, payload),
        pinnedNotesList: DeleteNoteArrayMutator(state.pinnedNotesList, payload),
      };
    },
    successSearchNote(state: StateNotesType, payload: string): StateNotesType {
      const searchedNotes = state.notPinnedList.filter(item => item.title.toLowerCase().indexOf(payload.toLowerCase()) !== -1 ||  item.description.toLowerCase().indexOf(payload.toLowerCase()) !== -1)
      return {
        ...state,
        filteredNotesList: searchedNotes,
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
          }
        ],
        notPinnedList: DeleteNoteArrayMutator(state.notPinnedList, payload),
        filteredNotesList:  DeleteNoteArrayMutator(state.filteredNotesList, payload)
      };
    },
    successUnPinNote(state: StateNotesType, payload: number): StateNotesType {
      const pinnedNoteIndex = state.notesList.findIndex((el) => el.id === payload)
      return {
        ...state,
        pinnedNotesList: DeleteNoteArrayMutator(state.pinnedNotesList, payload),
        notPinnedList: [
          ...state.notPinnedList,
          {
            ...state.notesList[pinnedNoteIndex],
          }
        ],
        filteredNotesList: [
        ...state.filteredNotesList,
        {
          ...state.notesList[pinnedNoteIndex],
        }
      ],
      };
    }
  },
  effects: (dispatch) => {
    const { notes } = dispatch;
    return {
      load() {
          notes.successLoadNotesList(
              initialNotesState
          )
      },
      addNote(payload: AddNoteType) {
          notes.successAddLoadNote(
              payload
          )
      },
      editNote(payload: NoteType) {
        notes.successEditNote(
            payload
        )
      },
      deleteNote(payload: number) {
        notes.successDeleteNote(
            payload
        )
      },
      searchNotes(payload: string) {
        notes.successSearchNote(
            payload
        )
      },
      pinNote(payload: number) {
        notes.successPinNote(
            payload
        )
      },
      unPinNote(payload: number) {
        notes.successUnPinNote(
            payload
        )
      }
    };
  }
});
