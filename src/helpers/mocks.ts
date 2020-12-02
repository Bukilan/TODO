import { ArrayNotesType } from "../Types/models/nodes";
import {ArrayTagsType} from "../Types/models/tag";

export const initialNotesState: ArrayNotesType = [
    {
        id: 1,
        title: 'Покормить кота',
        description: 'Корм лежит в кладовке',
        isPinned: false,
        noteTags: [
            {
                id: 1,
                name: 'Деньги',
                isActive: false
            },
            {
                id: 2,
                name: 'Документы',
                isActive: false
            },
        ]
    },
    {
        id: 2,
        title: 'Положить деньги на телефон другу',
        description: 'Номер 88005553535',
        isPinned: false,
        noteTags: [
            {
                id: 1,
                name: 'Деньги',
                isActive: true
            },
            {
                id: 2,
                name: 'Документы',
                isActive: false
            },
        ]
    },
    {
        id: 3,
        title: 'Подать на налоговый вычет',
        description: 'Посмотреть в инете до какого числа надо подавать. В теории, как и налоги, до декабря',
        isPinned: false,
        noteTags: [
            {
                id: 1,
                name: 'Деньги',
                isActive: true
            },
            {
                id: 2,
                name: 'Документы',
                isActive: true
            },
        ]
    },
    {
        id: 4,
        title: 'Забрать справку из участка',
        description: 'Пришла справка о несудимости, надо забрать',
        isPinned: true,
        noteTags: [
            {
                id: 1,
                name: 'Деньги',
                isActive: false
            },
            {
                id: 2,
                name: 'Документы',
                isActive: true
            },
        ]
    },
]

export const initialTags = [
    {
        id: 1,
        name: 'Деньги',
        isActive: false
    },
    {
        id: 2,
        name: 'Документы',
        isActive: false
    },
]

export const initialTag: ArrayTagsType = [{
    name: '',
    isActive: false,
    id: 1
}]

export const initialNote: ArrayNotesType = [{
    id: 1,
    title: '',
    description: '',
    isPinned: false,
    noteTags: initialTag
}]