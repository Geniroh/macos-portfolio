import gsap from "gsap";
// @ts-ignore
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components/index";
import { Finder, Resume, Safari, Terminal } from "#windows/index";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
    </main>
  );
};

export default App;
