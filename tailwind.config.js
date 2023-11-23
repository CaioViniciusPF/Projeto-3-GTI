/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'sombraDivs': ' -3px 4px 0px 0px rgba(212,212,212,0.3) , -5px 7px 0 0px rgba(51,51,51,0.5)',
        'press': 'inset -4px 4px 0px 0px rgba(51,51,51,0.3)',
      },

      backgroundImage:{
        'fundoTime':'radial-gradient(circle, rgb(156,163,175, 0.7) 25%, rgb(249, 250 ,251,0.13) 70%)',
      }
    },
  },
  plugins: [],
}

