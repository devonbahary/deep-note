import defaultTheme from 'tailwindcss/defaultTheme'
import { safelist } from './tailwind-safelist'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '425px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    safelist,
    plugins: [],
}
