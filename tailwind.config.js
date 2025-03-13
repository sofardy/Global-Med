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
                'light-bg': 'var(--light-bg)',
                'light-block': 'var(--light-block)',
                'light-accent': 'var(--light-accent)',
                'light-text': 'var(--light-text)',

                // Dark mode
                'dark-bg': 'var(--dark-bg)',
                'dark-block': 'var(--dark-block)',
                'dark-accent': 'var(--dark-accent)',
                'dark-text': 'var(--dark-text)',
            },
        },
    },
    plugins: [],
}