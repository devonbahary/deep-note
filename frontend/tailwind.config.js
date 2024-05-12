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
        extend: {
            animation: {
                "fadeIn": "fadeIn 1s ease-in-out var(--fadeIn-delay, 0) forwards",
            },
            keyframes: () => ({
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 }
                }
            })
        },
    },
    safelist,
    plugins: [],
}
