import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from './../../actios/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSave = () => {
        // console.log(active);
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click(); //Esto disimula el click del input type="file"
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }

    const date = new Date()
    const day = date.getDate()
    const m = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const month = m[date.getMonth()]
    const year = date.getFullYear();
    

    return (
        <div className="notes__appbar">
            <span>{`${day} ${month} ${year}`}</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display:'none'}}
                onChange={handleFileChange}
            />

            <div className="notes__btns">
                <button 
                    className="btn notes__btn-save-img"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>
                <button 
                    className="btn notes__btn-save-all"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
