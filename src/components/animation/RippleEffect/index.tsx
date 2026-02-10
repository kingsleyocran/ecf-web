import React, { CSSProperties } from "react";


interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.54,
  numCircles =5,
}: RippleProps) {
  return (
    <div
      className={"-bottom-[300px] md:-bottom-[400px] pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 100;
        const opacity = mainCircleOpacity - i * 0.1;
        const animationDelay = `${i * 0.06}s`;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-th-accent-medium`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

export default Ripple;
