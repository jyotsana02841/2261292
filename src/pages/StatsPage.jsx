import React from 'react';

const StatsPage = () => {
  const shortcodes = Object.keys(localStorage).filter(key => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return data && data.original;
    } catch {
      return false;
    }
  });

  return (
    <div>
      <h2>Shortened URL Stats</h2>
      <ul>
        {shortcodes.map(code => {
          const data = JSON.parse(localStorage.getItem(code));
          return (
            <li key={code} style={{ marginBottom: '1rem' }}>
              <div><strong>Short URL:</strong> <a href={`/${code}`}>{window.location.origin}/{code}</a></div>
              <div><strong>Original:</strong> {data.original}</div>
              <div><strong>Created:</strong> {new Date(data.created).toLocaleString()}</div>
              <div><strong>Expires:</strong> {new Date(data.expiry).toLocaleString()}</div>
              <div><strong>Clicks:</strong> {data.clicks}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatsPage;
