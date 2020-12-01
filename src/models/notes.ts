import { createModel } from "@rematch/core";
import { delay } from "../helpers/utils";
import { RootModel } from ".";
import { NotesStateType, NotesType, AddNoteType } from "../Types/models";
import {NoteType} from "../Types/models/nodes";


const initialState: NotesType = [
    {
      id: 1,
      title: 'title1',
      description: 'desc1',
    },
    {
      id: 2,
      title: 'title2',
      description: 'desc2',
    },
    {
      id: 3,
      title: 'title3',
      description: 'desc3',
    },
]

export const notes: any = createModel<RootModel>()({
  state: {
    notesList: [],
    filteredNotesList: [],
  },
  // @ts-ignore
  reducers: {
    successLoadNotesList(state: NotesStateType, payload: NotesType): NotesStateType {
      return {
        ...state,
        notesList: payload,
        filteredNotesList: payload,
      };
    },
    successAddLoadNote(state: NotesStateType, payload: AddNoteType): NotesStateType {
      const newId = state.notesList.length ?  state.notesList[state.notesList.length - 1].id + 1 : 0
      return {
        ...state,
        notesList: [
          ...state.notesList,
          {
            id: newId,
            ...payload
          }
        ],
        filteredNotesList:  [
          ...state.filteredNotesList,
          {
            id: newId,
            ...payload
          }
        ],
      };
    },
    successEditNote(state: NotesStateType, payload: NoteType): NotesStateType {
      const index = state.notesList.findIndex((el) => el.id === payload.id);
      const indexFiltered = state.filteredNotesList.findIndex((el) => el.id === payload.id);
      const newList = [...state.notesList]
      const newFilteredList = [...state.filteredNotesList]
      newList[index] = {
        id: payload.id,
        title: payload.title,
        description: payload.description
      }

      newFilteredList[indexFiltered] = {
        id: payload.id,
        title: payload.title,
        description: payload.description
      }
      console.log(newList)
      console.log(newFilteredList)
      return {
        ...state,
        notesList: newList,
        filteredNotesList: newFilteredList,
      };
    },
    successDeleteNote(state: NotesStateType, payload: number): NotesStateType {
      const index = state.notesList.findIndex((el) => el.id === payload);
      const indexFiltered = state.filteredNotesList.findIndex((el) => el.id === payload);
      return {
        ...state,
        notesList: [...state.notesList.slice(0, index), ...state.notesList.slice(index + 1)],
        filteredNotesList: [...state.filteredNotesList.slice(0, indexFiltered), ...state.filteredNotesList.slice(indexFiltered + 1)]
      };
    },
    successSearchNote(state: NotesStateType, payload: string): NotesStateType {
      const searchedNotes = state.notesList.filter(item => item.title.toLowerCase().indexOf(payload.toLowerCase()) !== -1 ||  item.description.toLowerCase().indexOf(payload.toLowerCase()) !== -1)
      return {
        ...state,
        filteredNotesList: searchedNotes,
      };
    }
  },
  effects: (dispatch) => {
    const { notes } = dispatch;
    return {
      load() {
          notes.successLoadNotesList(
              initialState
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
      }
    };
  }
});
