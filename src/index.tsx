import { initializeIcons } from "@fluentui/react/lib/Icons";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById("root")!).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Library icon registration
initializeIcons();
