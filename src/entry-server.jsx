import { renderToString } from "react-dom/server";
import Site from "./Site.jsx";
export const render = (sayfa, dil) => renderToString(<Site sayfa={sayfa} dil={dil} />);
