/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'sombraDivs': ' -3px 4px 0px 0px rgba(212,212,212,0.3) , -5px 7px 0 0px rgba(51,51,51,0.3)',
        'press': 'inset -4px 4px 0px 0px rgba(51,51,51,0.3)',
      }
    },
  },
  plugins: [],
}

