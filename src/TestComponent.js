import React from 'react';

export default function TestComponent() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is running correctly.</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
