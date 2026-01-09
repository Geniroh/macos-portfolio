/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef, type ComponentType } from "react";

// Higher-order component that wraps any component
const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: string
): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => {
    const { focusWindow, windows } = useWindowStore();

    const windowData = windows[windowKey];
    const { isOpen, zIndex } = windowData || { isOpen: false, zIndex: 0 };
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onClick={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    (Component as any).displayName || (Component as any).name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
