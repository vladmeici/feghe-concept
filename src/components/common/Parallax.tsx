"use client";

import { jarallax } from "jarallax";
import { useEffect } from "react";

interface ParallaxContainerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function ParallaxContainer(props: ParallaxContainerProps) {
  useEffect(() => {
    jarallax(document.querySelectorAll(".parallax-5"), {
      speed: 0.5,
    });
  }, []);
  return (
    <div
      //   ref={parallax.ref}
      {...props}
    >
      {props.children}
    </div>
  );
}
