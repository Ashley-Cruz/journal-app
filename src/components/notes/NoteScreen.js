import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actios/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title, id} = formValues;

    const activeId = useRef(note.id); //No va a redibujar todo el componente si cambia

    //Actualiza el id de la nota activa
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset])

    //Actualiza los valores de la nota activa
    useEffect(() => {
        // console.log(formValues)
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <div className="notes__container">
                <NotesAppBar />

                <div className="notes__content">
                    <div className="notes__text-container">
                        <input 
                            type="text"
                            placeholder="Some awesome title"
                            className="notes__title-input"
                            autoComplete="off"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            placeholder="what happened today"
                            className="notes__text-area"
                            name="body"
                            value={body}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="notes__content-img-btn">
                        <div className="notes__content-img">
                            {
                                (note.url) &&
                                    <img 
                                        src={note.url}
                                        alt="imagen"
                                    />
                            }
                        </div>
                        <button
                            className="btn btn-danger notes__btn"
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
