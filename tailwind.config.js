const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        ...defaultTheme.colors,
        gray: {
          light: '#f4f4f4',
          med: '#C7C7C7',
          dark: '#4a4a4a',
          border: '#D8D8D8',
        },
        teal: {
          DEFAULT: '#116979',
          light: '#80A9AD',
          med: '#59696E',
          dark: '#2B4046',
        },
        green: {
          icon: '#08697A',
          DEFAULT: '#00BB85',
          med: '#01BB00',
        },
        yellow: {
          DEFAULT: '#EDAA3B',
        },
        red: {
          DEFAULT: '#ED643B',
        },
      },
      fontFamily: {
        arimo: [
          'Arimo',
        ],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        '2xs': '0.5rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      maxWidth: {
        'logo': '168px',
      }
    },
  },
  variants: {},
  plugins: [],
}
