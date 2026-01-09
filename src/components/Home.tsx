import { locations } from "#constants/index";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
// @ts-ignore
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import type { LocationChild } from "#constants/constants.types";
import useLocationStore from "#store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  const handleOpenProjectFinder = (project: LocationChild) => {
    setActiveLocation(project);
    openWindow("finder", project);
  };
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src={`/images/folder.png`} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
