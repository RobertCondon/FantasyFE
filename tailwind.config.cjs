/** @type {import('tailwindcss').Config}*/
const { join } = require('path');

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          // Dark Green Shades
          50: '#e6f4ea',  // Lightest
          100: '#cce9d5',
          200: '#99d3ab',
          300: '#66bd81',
          400: '#339a57',
          500: '#007700',  // Primary Green
          600: '#006600',
          700: '#005500',
          800: '#004400',
          900: '#003300',  // Darkest
        },
        secondary: {
          // Gold Shades
          50: '#fff8e1',
          100: '#ffefb3',
          200: '#ffe085',
          300: '#ffd157',
          400: '#ffc229',
          500: '#FFD700',  // Primary Gold
          600: '#e6c200',
          700: '#ccad00',
          800: '#b39800',
          900: '#998300',
        },
        // Additional colors
        background: '#FFFFFF',
        accent: '#FFFAF0',  // Soft gold for lighter elements or highlights
      }
    }
  }
};

module.exports = config;
