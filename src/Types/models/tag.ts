export type TagType = {
    id: number
    name: string,
    isActive: boolean,
}

export type ArrayTagsType = Array<TagType>

export type StateTagsType = {
    tagsList: ArrayTagsType
}