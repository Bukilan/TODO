import { createModel } from "@rematch/core";
import { RootModel } from ".";
import {ArrayTagsType, StateTagsType} from "../Types/models/tag";
import { changeTagStatus, DeleteTagArrayMutator, AddTagArrayMutator } from "../helpers/utils";

const initialTags = [
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
        isActive: true
    }
]

export const tags: any = createModel<RootModel>()({
    state: {
        tagsList: []
    },
    // @ts-ignore
    reducers: {
        successLoadTagsList(state: StateTagsType, payload: ArrayTagsType): StateTagsType {
            return {
                ...state,
                tagsList: payload
            }
        },
        successChangeTagStatus(state: StateTagsType, payload: number): StateTagsType {
            return {
                ...state,
                tagsList: changeTagStatus(state.tagsList, payload)
            }
        },
        successDeleteTag(state: StateTagsType, payload: number): StateTagsType {
            return {
                ...state,
                tagsList: DeleteTagArrayMutator(state.tagsList, payload)
            }
        },
        successAddTag(state: StateTagsType, payload: string): StateTagsType {
            return {
                ...state,
                tagsList: AddTagArrayMutator(state.tagsList, payload)
            }
        }
    },
    effects: (dispatch) => {
        const { tags } = dispatch;
        return {
            load() {
                tags.successLoadTagsList(
                    initialTags
                )
            },
            changeStatus(id: number) {
                tags.successChangeTagStatus(
                    id
                )
            },
            deleteTag(id: number) {
                tags.successDeleteTag(
                    id
                )
            },
            addTag(name: string) {
                tags.successAddTag(
                    name
                )
            },
        };
    }
});
