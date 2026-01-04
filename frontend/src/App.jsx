import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteDetail from './components/NoteDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NoteList />} />
                <Route path="/create" element={<NoteForm />} />
                <Route path="/notes/:id" element={<NoteDetail />} />
                <Route path="/edit/:id" element={<NoteForm />} />
            </Routes>
        </Router>
    );
}

export default App;
