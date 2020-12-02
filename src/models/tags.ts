import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { ArrayTagsType, StateTagsType } from "../Types/models/tag";
import { changeTagStatus, deleteTagArrayMutator, addTagArrayMutator, delay } from "../helpers/utils";
import { initialTag, initialTags } from "../helpers/mocks";

export const tags: any = createModel<RootModel>()({
    state: {
        tagsList: initialTag
    },
    reducers: {
        successLoadTagsList(state: StateTagsType, payload: ArrayTagsType): StateTagsType {
            return {
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
                tagsList: deleteTagArrayMutator(state.tagsList, payload)
            }
        },
        successAddTag(state: StateTagsType, payload: string): StateTagsType {
            return {
                ...state,
                tagsList: addTagArrayMutator(state.tagsList, payload)
            }
        }
    },
    effects: (dispatch) => {
        const { tags } = dispatch;
        return {
            async load() {
                await delay(500);
                tags.successLoadTagsList(
                    initialTags
                )
            },
            async changeStatus(id: number) {
                await delay(200);
                tags.successChangeTagStatus(
                    id
                )
            },
            async deleteTag(id: number) {
                await delay(200);
                tags.successDeleteTag(
                    id
                )
            },
            async addTag(name: string) {
                await delay(200);
                tags.successAddTag(
                    name
                )
            },
        };
    }
});
