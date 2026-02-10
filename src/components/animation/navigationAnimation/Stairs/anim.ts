export const expand = {
  initial: {
    top: 0,
  },
  enter: (i: any) => ({
    top: "100%",
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: 0, top: 0 },
  }),
  exit: (i: any) => ({
    height: "100%",
    top: "0",
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const expandExit = {
  initial: {
    bottom: 0,
  },
  enter: (i: any) => ({
    bottom: "100%",
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: 0, bottom: 0 },
  }),
  exit: (i: any) => ({
    height: "100%",
    bottom: "0",
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const opacity = {
  initial: {
    opacity: 0.7,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.7,
  },
};


