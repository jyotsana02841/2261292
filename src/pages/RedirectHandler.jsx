import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const entry = localStorage.getItem(shortcode);
    if (!entry) {
      alert("Shortcode not found!");
      return;
    }

    const data = JSON.parse(entry);
    const now = new Date();
    const expiry = new Date(data.expiry);

    if (now > expiry) {
      alert("This link has expired.");
      return;
    }

    // Update click count
    data.clicks = (data.clicks || 0) + 1;
    localStorage.setItem(shortcode, JSON.stringify(data));

    window.location.href = data.original;
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
