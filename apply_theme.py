import os
import re

def main():
    os.chdir('c:/Users/sw971/little-brass-homepage')

    # 1. Update style.css
    with open('public/static/style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    
    css = css.replace('--black: #212529;', '--black: #333333;')
    css = re.sub(r'footer\s*\{\s*background:\s*#[0-9a-fA-F]+;\s*\}', 'footer {\n  background: #ffffff;\n}', css)
    css = re.sub(r'nav\s*\{\s*background:\s*#[0-9a-fA-F]+;\s*', 'nav {\n  background: #ffffff;\n', css)

    with open('public/static/style.css', 'w', encoding='utf-8') as f:
        f.write(css)

    # 2. Update renderer.tsx
    with open('src/renderer.tsx', 'r', encoding='utf-8') as f:
        renderer = f.read()

    # Header menu text
    renderer = renderer.replace('text-gray-800 hover:text-yellow-600', 'text-gray-700 hover:text-yellow-500')
    renderer = renderer.replace('text-gray-800 hover:bg-yellow-50', 'text-gray-700 hover:bg-yellow-50')
    # Logo text keep dark but softer? Let's leave text-gray-800 for logo.

    # Buttons softer gradient
    renderer = renderer.replace('from-yellow-400 to-orange-400', 'from-yellow-300 to-yellow-500')
    renderer = renderer.replace('hover:from-yellow-300 hover:to-orange-300', 'hover:from-yellow-200 hover:to-yellow-400')
    renderer = renderer.replace('from-orange-400 to-amber-500', 'from-yellow-400 to-yellow-500')
    renderer = renderer.replace('hover:from-orange-300 hover:to-amber-400', 'hover:from-yellow-300 hover:to-yellow-400')

    # Footer
    renderer = renderer.replace('bg-gray-100 text-gray-700', 'bg-white text-gray-600')
    renderer = renderer.replace('bg-gray-200 hover:bg-yellow-400', 'bg-gray-50 hover:bg-yellow-100 border border-gray-100')
    renderer = renderer.replace('text-gray-700 text-2xl', 'text-gray-600 text-2xl')
    renderer = renderer.replace('text-gray-600 leading-relaxed mb-4', 'text-gray-500 leading-relaxed mb-4')
    
    # Generic Shadows
    renderer = renderer.replace('shadow-2xl', 'shadow-md')
    renderer = renderer.replace('shadow-xl', 'shadow-sm hover:shadow-md')
    renderer = renderer.replace('shadow-lg', 'shadow-sm')

    with open('src/renderer.tsx', 'w', encoding='utf-8') as f:
        f.write(renderer)

    # 3. Update index.tsx
    with open('src/index.tsx', 'r', encoding='utf-8') as f:
        index = f.read()

    # Generic Shadows
    index = index.replace('shadow-2xl', 'shadow-md')
    index = index.replace('shadow-xl', 'shadow-sm hover:shadow-md')
    index = index.replace('shadow-lg', 'shadow-sm hover:shadow-md')
    
    # Remove duplicate shadow-sm hover:shadow-md
    index = index.replace('shadow-sm hover:shadow-md hover:shadow-md', 'shadow-sm hover:shadow-md')

    # Backgrounds and Gradients
    index = index.replace('bg-gray-300 flex items-center', 'bg-gray-100 flex items-center')
    index = index.replace('text-gray-600 font-medium">영상 준비 중', 'text-gray-400 font-medium">영상 준비 중')
    index = index.replace('text-gray-500 mb-4', 'text-gray-300 mb-4')
    index = index.replace('text-gray-900', 'text-gray-800')
    
    index = index.replace('from-yellow-400 to-orange-400', 'from-yellow-300 to-yellow-500')
    index = index.replace('hover:from-yellow-300 hover:to-orange-300', 'hover:from-yellow-200 hover:to-yellow-400')
    
    # CTA Block
    cta_old = '<section class="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 text-white">'
    cta_new = '<section class="py-20 bg-white border-t border-gray-100">'
    index = index.replace(cta_old, cta_new)
    
    index = index.replace('<h2 class="text-4xl font-bold mb-4 drop-shadow-lg">지금 바로 시작하세요!</h2>', '<h2 class="text-4xl font-bold text-gray-800 mb-4">지금 바로 시작하세요!</h2>')
    index = index.replace('<p class="text-2xl mb-8 drop-shadow-md">원데이 클래스', '<p class="text-2xl text-gray-600 mb-8">원데이 클래스')
    
    cta_btn_old = 'bg-white text-gray-800 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition inline-block shadow-md text-lg'
    cta_btn_new = 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-white px-10 py-4 rounded-lg font-bold hover:from-yellow-200 hover:to-yellow-400 transition inline-block shadow-sm hover:shadow-md text-lg'
    index = index.replace(cta_btn_old, cta_btn_new)
    
    cta_badge_old = 'bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-bold mb-6'
    cta_badge_new = 'bg-yellow-50 text-yellow-700 border border-yellow-200 px-6 py-2 rounded-full text-sm font-bold mb-6'
    index = index.replace(cta_badge_old, cta_badge_new)
    
    # Gallery Hero Block (if exists) Let's replace securely using re
    index = re.sub(
        r'<section class="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20">',
        r'<section class="relative bg-white py-20 border-b border-gray-100">',
        index
    )
    index = re.sub(r'<div class="absolute inset-0" style="background-image: url\([^)]+\);"></div>', '', index)
    index = index.replace('<h1 class="text-5xl md:text-6xl font-display font-bold mb-6">갤러리</h1>', '<h1 class="text-5xl md:text-6xl text-gray-800 font-display font-bold mb-6">갤러리</h1>')
    index = index.replace('<p class="text-xl text-gray-300 max-w-2xl mx-auto">', '<p class="text-xl text-gray-600 max-w-2xl mx-auto">')
    index = index.replace('bg-gold-500/20 text-gold-400', 'bg-yellow-50 text-yellow-700 border border-yellow-200')
    
    # Online Hero Block
    online_bg_old = 'bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-12 text-center'
    online_bg_new = 'bg-white border border-gray-100 rounded-2xl p-12 mb-12 text-center shadow-sm'
    index = index.replace(online_bg_old, online_bg_new)
    index = index.replace('<h2 class="text-3xl font-bold mb-4">집에서도', '<h2 class="text-3xl font-bold text-gray-800 mb-4">집에서도')
    index = index.replace('<p class="text-xl">Zoom을', '<p class="text-xl text-gray-600">Zoom을')
    index = index.replace('<i class="fas fa-video text-6xl mb-6"></i>', '<i class="fas fa-video text-6xl text-blue-600 mb-6"></i>')
    
    # Find all Cards with bg-white and ensure they have border border-gray-100
    index = re.sub(r'class="bg-white([^"]*?)rounded', r'class="bg-white\1border border-gray-100 rounded', index)
    index = index.replace('border border-gray-100 border border-gray-100', 'border border-gray-100')
    index = index.replace('border border-gray-100 border rounded-lg', 'border border-gray-100 rounded-lg')

    with open('src/index.tsx', 'w', encoding='utf-8') as f:
        f.write(index)

if __name__ == '__main__':
    main()
