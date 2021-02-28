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
        gray: {
          light: '#f4f4f4',
          med: '#C7C7C7',
          dark: '#4a4a4a',
          border: '#D8D8D8',
        },
        teal: {
          default: '#116979',
          light: '#80A9AD',
          med: '#59696E',
          dark: '#2B4046',
        },
        green: {
          100: '#f0fff4',
          200: '#c6f6d5',
          300: '#9ae6b4',
          400: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
          800: '#276749',
          900: '#22543d',
          icon: '#08697A',
          default: '#00BB85',
          med: '#01BB00',
        },
        yellow: {
          100: '#fffff0',
          200: '#fefcbf',
          300: '#faf089',
          400: '#f6e05e',
          500: '#ecc94b',
          600: '#d69e2e',
          700: '#b7791f',
          800: '#975a16',
          900: '#744210',
          default: '#EDAA3B',
        },
        red: {
          default: '#ED643B',
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
        xl: '1.2rem',
        '3xl': '1.75rem',
      },
      maxWidth: {
        'logo': '168px',
      }
    },
  },
  variants: {},
  plugins: [],
}

// module.exports = {
//   important: true,
//   theme: {
//       extend: {
//           colors: {
//               'gray': {
//                   'light': '#f4f4f4',
//                   'med': '#C7C7C7',
//                   'dark': '#4a4a4a',
//                   'border': '#D8D8D8',
//               },
//               'teal': {
//                   'default': '#116979',
//                   'light': '#80A9AD',
//                   'mid': '#59696E',
//                   'dark': '#2B4046',
//               }
//             }
//       }

  //   fontFamily: {
  //     display: ['Gilroy', 'sans-serif'],
  //     body: ['Graphik', 'sans-serif'],
  //   },
  //   extend: {
  //     colors: {
  //       cyan: '#9cdbff',
  //     },
  //     margin: {
  //       '96': '24rem',
  //       '128': '32rem',
  //     },
  //   }
//   }
// }
