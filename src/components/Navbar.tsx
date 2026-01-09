import dayjs from "dayjs";
import type { NavIcon, NavLink } from "#constants/constants.types";
import { navIcons, navLinks } from "#constants/index";
import useWindowStore from "#store/window";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Portfolio</p>
        <ul>
          {navLinks.map((link: NavLink) => (
            <li key={link.id} onClick={() => openWindow(link.type)}>
              <p>{link.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map((icon: NavIcon) => (
            <li key={icon.id}>
              <img src={icon.img} alt={`icon-${icon.id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
