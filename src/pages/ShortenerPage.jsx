import React, { useState } from "react";
import { logEvent } from '../utils/loggerMiddleware';

const ShortenerPage = ({ logId }) => {
  // your existing state and functions

  // ...generateShortcode, handleChange remain same

  const handleSubmit = () => {
    logEvent('USER_ACTION', 'Shorten All clicked', { logId });

    const output = [];

    inputs.forEach((input, i) => {
      const { url, shortcode, validity } = input;

      if (!url || !url.startsWith("http")) {
        const errorMsg = "Invalid or missing URL";
        logEvent('ERROR', errorMsg, { logId, inputIndex: i, url });
        output.push({ error: errorMsg });
        return;
      }

      const finalCode = shortcode || generateShortcode();

      if (localStorage.getItem(finalCode)) {
        const errorMsg = `Shortcode '${finalCode}' already exists.`;
        logEvent('ERROR', errorMsg, { logId, inputIndex: i, shortcode: finalCode });
        output.push({ error: errorMsg });
        return;
      }

      const created = new Date();
      const expiresInMin = parseInt(validity) || 30;
      const expiry = new Date(created.getTime() + expiresInMin * 60000);

      const data = {
        original: url,
        created: created.toISOString(),
        expiry: expiry.toISOString(),
        clicks: 0,
      };

      localStorage.setItem(finalCode, JSON.stringify(data));

      logEvent('SUCCESS', 'URL shortened successfully', { logId, shortcode: finalCode, originalUrl: url });

      output.push({ shortcode: finalCode, ...data });
    });

    setResults(output);
  };

  // ...rest of your component return JSX stays the same
};

export default ShortenerPage;
