import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F3E9D7",
        creamy: "#F3E9D7",
        cappuccino: "#D6BFA6",
        caramel: "#B08968",
        mocha: "#7A553A",
        dark: "#3B2A22",
        espresso: "#3B2A22",
        white: "#FDFCFA",
        "text-muted": "#7A553A",
      },
      fontFamily: {
        garamond: ["'Cormorant Garamond'", "serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        'wedding': '120px',
      },
      animation: {
        'float-orb': 'floatOrb 8s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'preloader-fade': 'preloaderFade 1.8s ease forwards',
        'line-grow': 'lineGrow 1.2s 0.6s ease forwards',
        'sparkle-anim': 'sparkleAnim 0.8s ease forwards',
      },
      keyframes: {
        floatOrb: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.6)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        preloaderFade: {
          'to': { opacity: '1' },
        },
        lineGrow: {
          'to': { transform: 'scaleX(1)' },
        },
        sparkleAnim: {
          '0%': { opacity: '0.8', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0) translateY(-30px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
