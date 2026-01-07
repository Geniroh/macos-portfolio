import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type JSX } from "react";

type FontWeightType = "subtitle" | "title";

interface FontWeightConfig {
  min: number;
  max: number;
  default: number;
}

const FONT_WEIGHTS: Record<FontWeightType, FontWeightConfig> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
): JSX.Element[] => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight + index * 10}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (
  container: HTMLElement | null,
  type: FontWeightType
): (() => void) | undefined => {
  if (!container) return;

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25
  ): gsap.core.Tween => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (event: MouseEvent): void => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: letterLeft, width: letterWidth } =
        letter.getBoundingClientRect();

      const distance = Math.abs(mouseX - (letterLeft - left + letterWidth / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = (): void => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = (): JSX.Element => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
    const titleCleanup = setupTextHover(titleRef.current, "title");

    return () => {
      subtitleCleanup?.();
      titleCleanup?.();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Adrain Welcome to my Portfolio",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-7xl font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screen only.</p>
      </div>
    </section>
  );
};

export default Welcome;
