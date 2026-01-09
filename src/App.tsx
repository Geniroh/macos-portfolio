import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components/index";
import { Terminal } from "#windows/index";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  );
};

export default App;
