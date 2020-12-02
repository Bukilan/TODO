import { createModel } from "@rematch/core";
import {
  delay,
  editNoteArrayMutator,
  DeleteNoteArrayMutator,
  AddNoteArrayMutator,
  createNewId,
  deleteTagFromNoteArrayMutator,
  addTagToNoteArrayMutator,
  filterNotesArrayMutator,
} from "../helpers/utils";
import { RootModel } from ".";
import { ArrayNotesType, StateNotesType, NoteType } from "../Types/models/nodes";
import { AddNoteType } from "../Types/models/addNote";
import {ArrayTagsType} from "../Types/models/tag";

type NotesFilterType = {
  activeTags: ArrayTagsType
  searchQuery: string
}

const initialNotesState: ArrayNotesType = [
    {
      id: 1,
      title: 'title1',
      description: 'desc1',
      isPinned: false,
      noteTags: [
        {
          id: 1,
          name: 'Я',
          isActive: true
        },
        {
          id: 2,
          name: 'ХОЧУ',
          isActive: true
        },
        {
          id: 3,
          name: 'УМЕРЕТЬ',
          isActive: false
        },
      ]
    },
    {
      id: 2,
      title: 'title2',
      description: 'desc2',
      isPinned: false,
      noteTags: [
        {
          id: 1,
          name: 'Я',
          isActive: false
        },
        {
          id: 2,
          name: 'ХОЧУ',
          isActive: false
        },
        {
          id: 3,
          name: 'УМЕРЕТЬ',
          isActive: false
        },
      ]
    },
    {
      id: 3,
      title: 'title3',
      description: 'desc3',
      isPinned: false,
      noteTags: [
        {
          id: 1,
          name: 'Я',
          isActive: false
        },
        {
          id: 2,
          name: 'ХОЧУ',
          isActive: false
        },
        {
          id: 3,
          name: 'УМЕРЕТЬ',
          isActive: false
        },
      ]
    },
    {
      id: 4,
      title: 'Закрелённый ноут',
      description: 'ЛЛАЛЛАЛАЛАААЛАЛА',
      isPinned: true,
      noteTags: [
        {
          id: 1,
          name: 'Я',
          isActive: false
        },
        {
          id: 2,
          name: 'ХОЧУ',
          isActive: false
        },
        {
          id: 3,
          name: 'УМЕРЕТЬ',
          isActive: false
        },
      ]
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
      const newId = createNewId(state.notesList)
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
        notesList: editNoteArrayMutator(state.notesList, payload, 'NotesList'),
        filteredNotesList: editNoteArrayMutator(state.filteredNotesList, payload, 'filteredNotesList'),
        notPinnedList: editNoteArrayMutator(state.notPinnedList, payload, 'notPinnedList'),
        pinnedNotesList: editNoteArrayMutator(state.pinnedNotesList, payload, 'pinnedNotesList')
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
      pinNote(payload: number) {
        notes.successPinNote(
            payload
        )
      },
      unPinNote(payload: number) {
        notes.successUnPinNote(
            payload
        )
      },
      deleteTagFromNotes(payload: number) {
        notes.successDeleteTagFromNotes(
            payload
        )
      },
      addTagToNotes(payload: string) {
        notes.successAddTagToNotes(
            payload
        )
      },
      filterNotes(payload: NotesFilterType) {
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
