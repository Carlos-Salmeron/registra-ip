import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <header className="layout-header">
        <h1>REGISTRA-IP</h1>
      </header>
      <main className="layout-container">
        {children}
      </main>
    </div>
  );
}