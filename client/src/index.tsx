import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return <h1>Task Management App</h1>; 
};
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
    );
