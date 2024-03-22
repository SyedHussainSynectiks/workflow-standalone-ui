/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
      },
      textColor: {
        primary: '#3490dc',
      },
      backgroundColor: {
        primary: '#3490dc',
      },
    },
  },
  plugins: [],
}
