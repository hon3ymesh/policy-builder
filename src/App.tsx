// src/App.tsx - Updated Main App
import React from 'react';
import { PolicyBuilder } from './components/PolicyBuilder';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <PolicyBuilder />
    </div>
  );
}

export default App;