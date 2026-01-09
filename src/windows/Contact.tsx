import { WindowControls } from "#components/index";
import type { Social } from "#constants/constants.types";
import { socials } from "#constants/index";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.png"
          alt="Irochibuzor"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squah? Or just wanna talk tech</p>
        <p>
          Email me at{" "}
          <a href="mailto:irochibuzor@gmail.com">irochibuzor@gmail.com</a>
        </p>

        <ul>
          {socials.map((social: Social) => (
            <li key={social.id} style={{ backgroundColor: social.bg }}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                title={social.text}
              >
                <img src={social.icon} alt={social.text} className="size-5" />
                <p>{social.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
