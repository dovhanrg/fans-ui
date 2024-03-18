import {createRoot} from 'react-dom/client';
import App from "./components";
import React from "react";

const root = createRoot(document.body);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);