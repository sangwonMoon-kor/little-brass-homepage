import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="sticky top-0 z-[100] flex h-14 items-center justify-between bg-gold-500 px-5 lg:px-8">
            {/* Left text */}
            <p className="text-white sm:text-base font-medium">
                원데이 클래스 20,000원 - 금관악기의 매력을 경험해보세요
            </p>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* CTA pill button — hidden on mobile */}
                <button className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white text-gold-600 font-medium h-10 lg:h-12 px-6 lg:px-8 hover:opacity-90 transition-opacity">
                    지금 예약하기
                </button>

                {/* Close button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
