import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        gloria: ["Gloria Hallelujah", "cursive"],
      },
      colors: {
        "gray-950": "#111111", // Darker than gray-900
      },
    },
  },
  plugins: [],
});
