/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: {
                    50: '#fcf8f1',
                    100: '#f2ece2',
                    200: '#e8ddd0',
                },
                gold: {
                    400: '#D4AF37',
                    500: '#C9A227',
                    600: '#B8941C',
                },
                navy: {
                    800: '#1E3A5F',
                    900: '#0F1E3A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                cursive: ['Dancing Script', 'cursive'],
            },
        },
    },
    plugins: [],
}
