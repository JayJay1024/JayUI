/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        notificationenter: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        notificationleave: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0, maxHeight: 0, border: "nonce", marginBottom: 0 },
        },
      },
      animation: {
        "notification-enter": "notificationenter 400ms ease-out",
        "notification-leave": "notificationleave 400ms ease-out",
      },
    },
  },
  plugins: [],
};
