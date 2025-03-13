/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                md: '1.5rem',
            },
        },
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
            backgroundColor: {
                light: {
                    bg: 'var(--light-bg)',
                    block: 'var(--light-block)',
                    accent: 'var(--light-accent)',
                },
                dark: {
                    bg: 'var(--dark-bg)',
                    block: 'var(--dark-block)',
                    accent: 'var(--dark-accent)',
                }
            },
            textColor: {
                light: {
                    base: 'var(--light-text)',
                },
                dark: {
                    base: 'var(--dark-text)',
                }
            }
        },
    },
    plugins: [],
}