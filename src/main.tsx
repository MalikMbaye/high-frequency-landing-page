import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAttribution } from "@/lib/attribution";

// Record the landing page before anything else so every cart/checkout can be
// traced back to the page that produced it (e.g. /hollywood-reporter).
captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
