// Tailwind CSS 커스텀 설정
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF8F0',
          100: '#F4E4B7',
          200: '#E6C86F',
          300: '#D4AF37',
          400: '#C5A572',
          500: '#D4AF37',
          600: '#B8941C',
          700: '#A67C1A',
          800: '#8B6515',
          900: '#6F5010',
        },
        navy: {
          50: '#E8ECF1',
          100: '#C5D2E0',
          200: '#8FA9C8',
          300: '#5A7FA0',
          400: '#3A5A7F',
          500: '#1E3A5F',
          600: '#2C5F8D',
          700: '#173050',
          800: '#0F1E3A',
          900: '#0A1628',
        },
        bronze: {
          400: '#E09856',
          500: '#CD7F32',
          600: '#B56F2A',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Sans KR', 'serif'],
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.2)',
        'navy': '0 4px 20px rgba(30, 58, 95, 0.2)',
        'premium': '0 10px 40px rgba(30, 58, 95, 0.1), 0 2px 8px rgba(212, 175, 55, 0.1)',
      }
    }
  }
}
