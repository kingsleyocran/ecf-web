/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
      keyframes: {
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      spacing: {
        "word-spacing-tight": "-0.05em",
      },
      colors: {
        "th-background": "var(--background)",
        "th-background-surface": "var(--background-surface)",
        "th-background-secondary": "var(--background-secondary)",
        "th-text-primary": "var(--text-primary)",
        "th-text-secondary": "var(--text-secondary)",
        "th-text-placeholder": "var(--text-placeholder)",
        "th-stroke-primary": "var(--stroke-primary)",
        "th-stroke-secondary": "var(--stroke-secondary)",
        "th-textbox-fill": "var(--textbox-fill)",
        "th-accent-dark": "var(--accent-dark)",
        "th-accent-medium": "var(--accent-medium)",
        "th-accent-light": "var(--accent-light)",
        "th-primary-dark": "var(--primary-dark)",
        "th-primary-medium": "var(--primary-medium)",
        "th-primary-light": "var(--primary-light)",
        "th-icon-primary": "var(--icon-primary)",
        "th-icon-secondary": "var(--icon-secondary)",
        "th-menu-highlight": "var(--menu-highlight)",
        "th-menu-highlight-secondary": "var(--menu-highlight-secondary)",
        "th-button-primary": "var(--button-primary)",
        "th-button-primary-disabled": "var(--button-primary-disabled)",
        "th-button-secondary": "var(--button-secondary)",
        "th-indicator-success": "var(--indicator-success)",
        "th-indicator-error": "var(--indicator-error)",
        "th-scroll-outer": "var(--scroll-outer)",
        "th-scroll-inner": "var(--scroll-inner)",
        "th-theme-main": "var(--theme-main)",
        "th-theme-alternate": "var(--theme-alternate)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      height: {
        100: "100px",
        150: "150px",
        200: "200px",
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        600: "600px",
        650: "650px",
        700: "700px",
        750: "750px",
        800: "800px",
        850: "850px",
        900: "900px",
        1000: "1000px",
        1100: "1100px",
        1200: "1200px",
        1300: "1300px",
        1400: "1400px",
        "view-height": "var(--view-height)",
      },
      width: {
        100: "100px",
        150: "150px",
        200: "200px",
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        600: "600px",
        650: "650px",
        700: "700px",
        750: "750px",
        800: "800px",
        850: "850px",
        900: "900px",
        1000: "1000px",
        1100: "1100px",
        1200: "1200px",
        1300: "1300px",
        1400: "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),

    function ({ addUtilities }) {
      addUtilities(
        {
          ".word-spacing-tight": {
            "word-spacing": "-0.05em",
          },
          // Add more custom word spacing utilities if needed
        },
        ["responsive", "hover"]
      );
    },
    require("tailwindcss-animate"),
  ],
};
