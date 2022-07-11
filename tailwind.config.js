// eslint-disable-next-line no-undef
module.exports = {
  content: [
    `./app/**/*.{html,js,ts,hbs}`,
    '../rfsg-proxy/src/main/webapp/unauthorized-error.jsp',
  ],
  theme: {
    extend: {
      spacing: {
        40: '10rem',
        54: '13.5rem',
        60: '15rem',
        120: '30rem',
      },
      colors: {
        primary: {
          50: '#edf5fd',
          100: '#d6edff',
          200: '#aed7f4',
          300: '#7abaeb',
          400: '#429ce0',
          500: '#1479cc',
          600: '#005fb3',
          700: '#005299',
          800: '#004785',
          900: '#003270',
        },
        grey: {
          200: '#DCE5E9',
          300: '#CFDBE3',
          700: '#485B6E',
        },
        neutral: {
          50: '#f5f8fa',
          100: '#e9eff2',
          200: '#dce6e9',
          300: '#cfdbe3',
          400: '#c1cdd7',
          500: '#abbbc9',
          600: '#6c8293',
          700: '#495c6f',
          800: '#2b3d4f',
          900: '#141c24',
        },
        secondary: {
          50: '#fff3e6',
          100: '#ffe5c7',
          200: '#fcd4a6',
          500: '#f28321',
          600: '#cd580a',
          900: '#702d00',
        },
        error: {
          500: '#bb2525',
        },
      },
    },
  },
  plugins: [],
};
