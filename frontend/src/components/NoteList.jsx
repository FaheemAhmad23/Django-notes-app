import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotes, deleteNote } from '../api';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id);
                fetchNotes();
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    return (
        <div className="container">
            <h1>My Notes</h1>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/create" className="btn btn-primary">Create New Note</Link>
            </div>
            <ul className="note-list">
                {notes.map(note => (
                    <li key={note.id} className="note-item">
                        <Link to={`/notes/${note.id}`}>{note.title}</Link>
                        <div>
                            <Link to={`/edit/${note.id}`} className="btn btn-secondary">Edit</Link>
                            <button onClick={() => handleDelete(note.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
