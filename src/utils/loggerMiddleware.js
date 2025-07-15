
export function logEvent(eventType, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType,
    message,
    ...data,
  };

  fetch('/api/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logEntry),
  }).catch((error) => {
    console.error('Logging failed, saving locally.', error);

    try {
      const existingLogs = JSON.parse(localStorage.getItem('appLogs')) || [];
      existingLogs.push(logEntry);
      localStorage.setItem('appLogs', JSON.stringify(existingLogs));
    } catch (e) {
      console.error('Failed to save logs locally.', e);
    }
  });
}
