import { StrictMode } from 'react'; // StrictMode is a tool for highlighting potential problems in an application
import { createRoot } from 'react-dom/client'; // createRoot is a new API that allows you to create a root without rendering anything
import "./styles.css";

import App from './App'; // Import the App component

const root = createRoot(document.getElementById('root')); // Create a root with the root element in the HTML file
root.render(
    <StrictMode>
        <App />        
    </StrictMode> 
);// Starting component of the application