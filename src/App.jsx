import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import RedirectHandler from './pages/RedirectHandler';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  // Store your log ID here (hardcoded or fetched dynamically)
  const [logId] = useState('1c910880-c7f9-4dcd-a4a1-5cdee989f0e9');

  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Shorten</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        {/* Pass logId as prop to pages/components */}
        <Route path="/" element={<ShortenerPage logId={logId} />} />
        <Route path="/stats" element={<StatsPage logId={logId} />} />
        <Route path="/:shortcode" element={<RedirectHandler logId={logId} />} />
      </Routes>
    </Router>
  );
}

export default App;
