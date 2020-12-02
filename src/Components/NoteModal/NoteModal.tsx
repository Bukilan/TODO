import React, { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import ModalWindow from "../ModalWindow";
import Button from '@material-ui/core/Button';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from "react-redux";
import Switch from '@material-ui/core/Switch';
import TagsCloudItem from "../TagsCloud/TagsCloudItem";
import { ArrayTagsType, StateTagsType } from "../../Types/models/tag";
import { RootStateType } from "../../Types/models/root";
import { changeTagStatus } from "../../helpers/utils";
import './NoteModal.scss';

type Props = {
    isOpen: boolean,
    handleClose: () => void,
    initTitle?: string,
    initDescription?: string,
    id?: number,
    initTags?: ArrayTagsType,
    isPinned?: boolean,
    isEditNote?: boolean
}

const NoteModal = ({ isOpen, handleClose, initTitle = '', initDescription = '', id, initTags = [], isPinned = false, isEditNote = false }: Props): ReactElement => {
    const dispatch = useDispatch();
    const { tagsList }: StateTagsType = useSelector(({ tags }: RootStateType) => tags);

    const [title, setTitle] = useState<string>(initTitle)
    const [description, setDescription] = useState<string>(initDescription)
    const [isBePinned, setIsBePinned] = useState<boolean>(isPinned)
    const [tagsArray, setTagsArray] = useState<ArrayTagsType>([])
    const [isTagsChanged, setIsTagsChanged] = useState<boolean>(false)

    useEffect(() => {
        if (!initTags.length) {
            setTagsArray(
                tagsList.map(item => {
                    return {
                        id: item.id,
                        isActive: false,
                        name: item.name
                    }
                })
            )
        } else {
            setTagsArray(initTags)
        }
    }, [tagsList, setTagsArray])

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleBePinnedChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsBePinned(prev => !prev)
    }

    const handleCreate = () => {
        if (!title) {
            return
        }
        dispatch.notes.addNote({
            title,
            description,
            isPinned: isBePinned,
            noteTags: tagsArray
        })

        setTitle('')
        setDescription('')
        setIsBePinned(false)

        handleClose()
    }

    const handleEdit = () => {
        if (title === initTitle && description === initDescription && isBePinned === isPinned && !isTagsChanged) return

        dispatch.notes.editNote({
            id,
            title,
            description,
            isPinned,
            noteTags: tagsArray
        })

        if (isBePinned) {
            if (!isPinned) {
                dispatch.notes.pinNote(
                    id
                )
            }
        } else {
            if (isPinned) {
                dispatch.notes.unPinNote(
                    id
                )
            }
        }

        handleClose()
    }

    const handleTagClick = (id: number): () => void => (): void => {
        setTagsArray(prev => {
            return changeTagStatus(prev, id)
        })
        setIsTagsChanged(true)
    }

    return (
        <div className='AddNote-zone'>
            <ModalWindow
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <div className='AddNote-wrapper'>
                    <div className='AddNote-container'>
                        <input onChange={handleTitleChange} value={title} placeholder='Название...' className='AddNote-title AddNote-input' />
                        <TextareaAutosize onChange={handleDescriptionChange} value={description} placeholder='Заметка...' className='AddNote-description AddNote-input' />
                        <div className='AddNote-tags'>
                            {tagsArray.map(item => (
                                <TagsCloudItem key={item.id} name={item.name} id={item.id} isActive={item.isActive} onElemClick={handleTagClick} />
                            ))}
                        </div>
                        <div className='AddNote-controls'>
                            <div className='AddNote-switch'>
                                <Switch
                                    checked={isBePinned}
                                    onChange={handleBePinnedChange}
                                    color="primary"
                                    name='pinCheck'
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <div className='AddNote-switch_text'>Закрепить ?</div>
                            </div>
                            {!isEditNote ? (
                                <Button onClick={handleCreate} className='AddNote-button' variant="contained" color={title ? "primary" : "secondary" }>
                                    Создать заметку !
                                </Button>
                            ) : (
                                <Button disabled={title === initTitle && description === initDescription && isBePinned === isPinned && !isTagsChanged} onClick={handleEdit} className='AddNote-button' variant="contained" color="primary">
                                    Сохранить заметку !
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}

export default NoteModal;
