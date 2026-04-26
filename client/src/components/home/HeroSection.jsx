import HeroContent from "./HeroContent";
import ChatPreview from "./ChatPreview";
import { CHAT_MESSAGES } from "../../data/heroData";

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex items-start overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-150 h-100 rounded-full bg-amber-400 opacity-[0.08] blur-[120px] will-change-transform" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <HeroContent />

          <div className="hidden lg:block">
            <ChatPreview messages={CHAT_MESSAGES} />
          </div>
        </div>
      </div>
    </section>
  );
}
