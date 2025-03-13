/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode
                'light-bg': '#f7f7f7',
                'light-block': '#ffffff',
                'light-accent': '#00c78b',
                'light-text': '#094A54',

                // Dark mode
                'dark-bg': '#11363c',
                'dark-block': '#094a54',
                'dark-accent': '#00c78b',
                'dark-text': '#ffffff',
            },
        },
    },
    plugins: [],
}