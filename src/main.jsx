import { hydrateRoot, createRoot } from "react-dom/client";
import Site from "./Site.jsx";
import "./app.css";
const kok = document.getElementById("root");
const { sayfa = "ana", dil = "tr" } = kok.dataset;
const el = <Site sayfa={sayfa} dil={dil} />;
if (kok.hasChildNodes()) hydrateRoot(kok, el); else createRoot(kok).render(el);
