import preactLogo from "../../assets/preact.svg";
import Playground from "./components/Playground";
import NewBlockPanel from "./components/NewBlockPanel";

import "./style.scss";

export function Home() {
  return (
    <div className="home">
      <NewBlockPanel />
      <Playground />
    </div>
  );
}
