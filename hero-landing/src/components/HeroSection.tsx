import { Navbar } from './Navbar'

export function HeroSection() {
    return (
        <div className="relative mx-auto flex min-h-0 flex-1 max-w-[1800px] w-full flex-col p-3 sm:p-5 lg:p-[30px]">
            {/* Navbar overlaying hero */}
            <Navbar />

            {/* Hero content area */}
            <div className="hero-container relative flex h-full flex-col items-center justify-end overflow-hidden rounded-[24px] pb-10 sm:rounded-[32px] sm:pb-14 lg:rounded-[40px] lg:pb-16">
                {/* Background — gradient placeholder for video */}
                <div className="absolute inset-0 -z-20 h-full w-full bg-gradient-to-br from-navy-800 to-navy-900" />

                {/* Text content */}
                <div className="max-w-[500px] px-6 text-center lg:max-w-none">
                    {/* Subtitle */}
                    <p className="hero-subtitle font-cursive text-lg text-gold-400 sm:text-xl lg:text-2xl">
                        Premium Brass Education
                    </p>

                    {/* Main heading */}
                    <h1 className="hero-title mt-2 font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl md:text-6xl lg:mt-3 lg:text-[70px]">
                        금관악기로 여는
                        <br />
                        새로운 음악
                    </h1>

                    {/* Description */}
                    <p className="hero-description mt-4 text-base text-white/70 lg:text-lg">
                        전문 강사진과 함께하는 최고급 음악 교육
                    </p>

                    {/* CTA buttons */}
                    <div className="hero-buttons mt-6 flex items-center justify-center gap-4">
                        <button className="rounded-full bg-gold-500 text-white h-12 px-8 hover:bg-gold-600 transition-colors font-medium">
                            커리큘럼 보기
                        </button>
                        <button className="rounded-full border-2 border-white text-white h-12 px-8 hover:bg-white/10 transition-colors font-medium">
                            원데이 클래스 예약
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
