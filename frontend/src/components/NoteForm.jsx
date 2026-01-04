import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, getNote, updateNote } from '../api';

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchNote();
        }
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await getNote(id);
            setTitle(response.data.title);
            setBody(response.data.body);
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = { title, body };
        try {
            if (id) {
                await updateNote(id, note);
            } else {
                await createNote(note);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit Note' : 'Create Note'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <div className="actions">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
