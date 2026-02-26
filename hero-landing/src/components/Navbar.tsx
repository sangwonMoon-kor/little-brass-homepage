import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
    { label: '커리큘럼', href: '#' },
    { label: '온라인과정', href: '#' },
    { label: '강사진', href: '#' },
    { label: '갤러리', href: '#' },
    { label: '학생성과', href: '#' },
]

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="absolute left-0 right-0 top-0 z-[98] mx-auto max-w-[calc(100%-60px)] text-white">
            <div className="flex items-center justify-between px-5 pb-5 pt-8 sm:px-8 sm:pt-10 lg:pb-7 lg:pt-12">
                {/* Logo */}
                <div>
                    <h1 className="font-serif text-2xl font-semibold lg:text-3xl">
                        Little Brass
                    </h1>
                    <p className="text-xs text-white/70">Premium Music Academy</p>
                </div>

                {/* Center nav links — desktop only */}
                <nav className="hidden items-center lg:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flex items-center justify-center rounded-full h-9 px-5 text-base hover:bg-white/10 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* 더보기 dropdown button */}
                    <button className="ml-4 flex items-center justify-center gap-1.5 rounded-full border-2 border-white/50 h-9 px-5 text-base hover:border-white hover:bg-white/10 transition-all">
                        더보기
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* CTA buttons — hidden on mobile */}
                    <button className="hidden lg:inline-flex items-center justify-center rounded-full bg-gold-500 text-white h-10 px-6 hover:bg-gold-600 transition-colors">
                        원데이 클래스
                    </button>
                    <button className="hidden lg:inline-flex items-center justify-center rounded-full border-2 border-white text-white h-10 px-6 hover:bg-white/10 transition-colors">
                        문의하기
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-white/50 lg:hidden hover:border-white hover:bg-white/10 transition-all"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Menu className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute left-4 right-4 top-full rounded-2xl bg-navy-900/95 backdrop-blur-xl p-6 lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="flex items-center rounded-xl h-12 px-4 text-lg text-white hover:bg-white/10 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                        <button className="flex items-center justify-center rounded-full bg-gold-500 text-white h-12 px-6 hover:bg-gold-600 transition-colors text-base font-medium">
                            원데이 클래스
                        </button>
                        <button className="flex items-center justify-center rounded-full border-2 border-white text-white h-12 px-6 hover:bg-white/10 transition-colors text-base font-medium">
                            문의하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
