import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote } from '../api';

const NoteDetail = () => {
    const [note, setNote] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchNote();
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await getNote(id);
            setNote(response.data);
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id);
                navigate('/');
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    if (!note) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1>{note.title}</h1>
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.body}</p>
            <p><small>Created at: {new Date(note.created_at).toLocaleString()}</small></p>
            <div className="actions">
                <Link to="/" className="btn btn-secondary">Back</Link>
                <Link to={`/edit/${note.id}`} className="btn btn-primary">Edit</Link>
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default NoteDetail;
