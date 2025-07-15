import React, { useState } from 'react';

const ShortenerPage = () => {
  const initialInputs = Array(5).fill({ url: '', shortcode: '', validity: '' });
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState([]);

  const generateShortcode = () => Math.random().toString(36).substring(2, 8);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const output = [];

    inputs.forEach((input, i) => {
      const { url, shortcode, validity } = input;
      if (!url || !url.startsWith('http')) {
        output.push({ error: 'Invalid or missing URL' });
        return;
      }

      const finalCode = shortcode || generateShortcode();

      if (localStorage.getItem(finalCode)) {
        output.push({ error: `Shortcode '${finalCode}' already exists.` });
        return;
      }

      const created = new Date();
      const expiresInMin = parseInt(validity) || 30;
      const expiry = new Date(created.getTime() + expiresInMin * 60000);

      const data = {
        original: url,
        created: created.toISOString(),
        expiry: expiry.toISOString(),
        clicks: 0
      };

      localStorage.setItem(finalCode, JSON.stringify(data));
      output.push({ shortcode: finalCode, ...data });
    });

    setResults(output);
  };

  return (
    <div>
      <h2>Shorten Up to 5 URLs</h2>
      {inputs.map((input, idx) => (
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <input
            placeholder="Long URL"
            value={input.url}
            onChange={e => handleChange(idx, 'url', e.target.value)}
            style={{ width: '300px' }}
          />
          <input
            placeholder="Custom Code"
            value={input.shortcode}
            onChange={e => handleChange(idx, 'shortcode', e.target.value)}
            style={{ marginLeft: '10px', width: '120px' }}
          />
          <input
            placeholder="Validity (min)"
            type="number"
            value={input.validity}
            onChange={e => handleChange(idx, 'validity', e.target.value)}
            style={{ marginLeft: '10px', width: '100px' }}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Shorten All</button>

      <h3>Results:</h3>
      <ul>
        {results.map((res, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            {res.error ? (
              <span style={{ color: 'red' }}>{res.error}</span>
            ) : (
              <>
                <div><strong>Code:</strong> {res.shortcode}</div>
                <div><strong>Short URL:</strong> <a href={`/${res.shortcode}`}>{window.location.origin}/{res.shortcode}</a></div>
                <div><strong>Original:</strong> {res.original}</div>
                <div><strong>Created:</strong> {new Date(res.created).toLocaleString()}</div>
                <div><strong>Expires:</strong> {new Date(res.expiry).toLocaleString()}</div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortenerPage;
