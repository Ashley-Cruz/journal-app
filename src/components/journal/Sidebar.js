import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actios/auth';
import { JournalEntries } from './JournalEntries';
import { startNewNote } from './../../actios/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-container">
                <div className="journal__sidebar-navbar">
                    <h3>
                        <i className="far fa-moon"></i>
                        <span> {name}</span>
                    </h3>
                    <button 
                        className="btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                <div 
                    className="journal__new-entry"
                    onClick={handleAddNew}
                >
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            <JournalEntries />
        </aside>
    )
}
