import { AnnouncementBanner } from './components/AnnouncementBanner'
import { HeroSection } from './components/HeroSection'

function App() {
    return (
        <div className="flex h-screen flex-col bg-white font-sans text-sm antialiased">
            <AnnouncementBanner />
            <HeroSection />
        </div>
    )
}

export default App
