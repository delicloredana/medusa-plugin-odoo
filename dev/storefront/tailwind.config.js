/** @type {import('tailwindcss').Config} */
const colors = {
  white: '#FFFFFF',
  black: {
    DEFAULT: '#000000',
    opacity: 'rgba(2, 1, 0, 0.2)',
  },
  gray: {
    900: '#050505',
    800: '#1F1F20',
    700: '#3A3A3B',
    600: '#545457',
    500: '#6F6F72',
    400: '#898A8D',
    300: '#A1A1A4',
    200: '#D0D0D2',
    100: '#E8E8E9',
    50: '#F4F4F4',
    30: '#F8F8F9',
    20: '#FBFBFB',
    10: '#FDFDFD',
  },
  blue: {
    900: '#162072',
    700: '#1E2DA0',
    400: '#878FCD',
    100: '#DFE2F2',
  },
  red: {
    900: '#BD3207',
    700: '#DF4718',
  },
  yellow: '#FFEFB7',
  transparent: 'rgba(0, 0, 0, 0)',
};

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      ...colors,
      primary: {
        DEFAULT: colors.blue[700],
        900: colors.blue[900],
        400: colors.blue[400],
        100: colors.blue[100],
      },
    },
    fontSize: {
      xl10: ['8rem', '1.2'],
      xl9: ['6rem', '1.2'],
      xl8: ['5rem', '1.2'],
      xl7: ['4.5rem', '1.2'],
      xl6: ['4rem', '1.2'],
      xl5: ['3.5rem', '1.4'],
      xl4: ['3rem', '1.4'],
      xl3: ['2.5rem', '1.4'],
      xl2: ['2.25rem', '1.4'],
      xl: ['2rem', '1.4'],
      lg: ['1.5rem', '1.4'],
      md: ['1.25rem', '1.4'],
      sm: ['1rem', '1.4'],
      xs: ['0.875rem', '1.4'],
      xs2: ['0.75rem', '1.4'],
      xs3: ['0.625rem', '1.4'],
    },
    fontFamily: {
      sans: ['var(--font-mona-sans)'],
    },
    boxShadow: {
      xl: '0 0 2.5rem -1rem rgba(0, 0, 0, 0.2)',
    },
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        9: '2.25rem',
        9.25: '2.3125rem',
        10.5: '2.625rem',
        13: '3.25rem',
        13.5: '3.375rem',
        15: '3.75rem',
        15.5: '3.875rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        30: '7.5rem',
        31: '7.75rem',
        34: '8.5rem',
        37: '9.25rem',
        39: '9.75rem',
        39.5: '9.875rem',
        41: '10.25rem',
        42: '10.5rem',
        47: '11.75rem',
        50: '12.5rem',
        84: '21rem',
      },
      zIndex: {
        'size-tag': '1010',
        'dropdown-content': '1020',
        'dialog-overlay': '1030',
        'dialog-content': '1031',
        'site-header': '2000',
        'site-header-hamburger': '2001',
      },
      transitionProperty: {
        width: 'width',
        opacity: 'opacity',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      screens: {
        tall: { raw: '(min-height: 800px)' },
        tallWide: { raw: '(min-height: 800px) and (min-width: 1400px)' },
      },
      width: {
        '1/10': '90%',
        56.5: '14.25rem',
      },
      minWidth: {
        4: '1rem',
      },
      maxWidth: {
        16: '4rem',
        32: '8rem',
        154: '38.5rem',
        181: '45.25rem',
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
