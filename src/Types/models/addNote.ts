import { ArrayTagsType } from "./tag";

export type AddNoteType = {
    title: string,
    description: string,
    isPinned: boolean,
    noteTags: ArrayTagsType
}