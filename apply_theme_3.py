import os
import re

def main():
    os.chdir('c:/Users/sw971/little-brass-homepage')

    # Fix renderer.tsx
    with open('src/renderer.tsx', 'r', encoding='utf-8') as f:
        renderer = f.read()

    # Consolidate gold gradients to true gold #D4AF37
    renderer = re.sub(r'from-[a-z0-9\-]+ to-[a-z0-9\-]+', 'from-[#D4AF37] to-[#B8941C]', renderer)
    # The hover state
    renderer = re.sub(r'hover:from-[a-z0-9\-]+ hover:to-[a-z0-9\-]+', 'hover:from-[#E6C86F] hover:to-[#D4AF37]', renderer)
    
    # Text colors that are yellow/amber
    renderer = re.sub(r'text-yellow-[456]00', 'text-[#D4AF37]', renderer)
    renderer = re.sub(r'text-amber-[67]00', 'text-[#B8941C]', renderer)
    
    with open('src/renderer.tsx', 'w', encoding='utf-8') as f:
        f.write(renderer)

    # Fix index.tsx
    with open('src/index.tsx', 'r', encoding='utf-8') as f:
        index = f.read()

    # Fix Blog section background
    index = index.replace('bg-gradient-to-br from-[#D4AF37] to-[#B8941C]', 'bg-gray-50') # wait, from-yellow-50 via-orange-50 to-amber-50 was caught? No, python script 1 didn't change this
    index = index.replace('bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50', 'bg-white border-t border-gray-100')
    
    # Fix gradients to custom #D4AF37
    index = re.sub(r'from-yellow-[0-9]+ to-yellow-[0-9]+', 'from-[#D4AF37] to-[#B8941C]', index)
    index = re.sub(r'hover:from-yellow-[0-9]+ hover:to-yellow-[0-9]+', 'hover:from-[#E6C86F] hover:to-[#D4AF37]', index)
    index = re.sub(r'from-orange-[0-9]+ to-amber-[0-9]+', 'from-[#D4AF37] to-[#B8941C]', index)
    index = re.sub(r'hover:from-orange-[0-9]+ hover:to-amber-[0-9]+', 'hover:from-[#E6C86F] hover:to-[#D4AF37]', index)
    index = re.sub(r'from-yellow-[0-9]+ via-orange-[0-9]+ to-amber-[0-9]+', 'from-[#D4AF37] via-[#D4AF37] to-[#B8941C]', index)
    
    # Fix colored backgrounds to white/gray
    index = index.replace('bg-amber-50', 'bg-white border border-gray-100')
    index = index.replace('bg-amber-100', 'bg-gray-50')
    index = index.replace('bg-yellow-50', 'bg-gray-50')
    index = index.replace('bg-blue-50', 'bg-white border border-gray-100')
    index = index.replace('bg-blue-100', 'bg-gray-50')
    index = index.replace('bg-gradient-to-b from-blue-50 to-white', 'bg-white')
    
    # Online Section Headers & text
    index = index.replace('text-blue-600', 'text-[#D4AF37]')
    index = index.replace('text-blue-700', 'text-[#B8941C]')
    index = index.replace('text-amber-700', 'text-[#B8941C]')
    index = index.replace('border-blue-600', 'border-[#D4AF37]')
    index = index.replace('border-blue-700', 'border-[#B8941C]')
    index = index.replace('border-blue-200', 'border-gray-200')
    index = index.replace('border-amber-700', 'border-[#D4AF37]')
    index = index.replace('border-amber-600', 'border-[#B8941C]')
    index = index.replace('border-amber-500', 'border-[#B8941C]')
    index = index.replace('border-amber-400', 'border-[#B8941C]')

    # Darken secondary text
    index = index.replace('text-gray-500', 'text-gray-600')
    index = index.replace('text-gray-400">영상 준비 중', 'text-gray-500">영상 준비 중')
    index = index.replace('text-gray-300 mb-4', 'text-gray-400 mb-4') # Icons
    
    # Remove large shadows
    index = index.replace('drop-shadow-sm hover:shadow-md', 'drop-shadow-sm')
    index = index.replace('shadow-2xl', 'shadow-md')
    index = index.replace('shadow-xl', 'shadow-sm hover:shadow-md')

    with open('src/index.tsx', 'w', encoding='utf-8') as f:
        f.write(index)

    # Fix style.css variables just in case
    with open('public/static/style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    
    # Subtle scrollbar adjustments
    css = css.replace('rgba(30, 58, 95, 0.15)', 'rgba(0,0,0,0.05)')
    css = css.replace('rgba(30, 58, 95, 0.1)', 'rgba(0,0,0,0.03)')
    # White background enforce on sections
    css += "\n\n/* Ensure minimalist sections */\nsection { background-color: #ffffff; }\n"
    
    with open('public/static/style.css', 'w', encoding='utf-8') as f:
        f.write(css)

if __name__ == '__main__':
    main()
