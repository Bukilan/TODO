import { StateNotesType } from "./nodes";
import {StateTagsType} from "./tag";

export type RootStateType = {
    notes: StateNotesType
    tags: StateTagsType
}