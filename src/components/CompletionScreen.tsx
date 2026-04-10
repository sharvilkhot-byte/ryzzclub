import { useState, useEffect } from 'react';
import { MessageCircle, Heart, Sparkles, Zap, CheckCircle } from 'lucide-react';

export function CompletionScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#c5ff00' }}>
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(95, 76, 220, 0.3) 0%, transparent 70%)'
        }}
      />



      {/* Main content */}
      <div className="flex flex-col justify-center items-center min-h-screen px-4 md:px-8 relative z-10">
        <div 
          className="max-w-3xl mx-auto text-center transition-all duration-1000 ease-out"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0
          }}
        >
          
          {/* Success icon */}
          <div className="mb-8 md:mb-12">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-700 ease-out"
              style={{ 
                backgroundColor: 'rgba(95, 76, 220, 0.15)',
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <CheckCircle 
                className="w-10 h-10 md:w-12 md:h-12" 
                style={{ color: '#5f4cdc' }} 
              />
            </div>
          </div>

          {/* Main completion message */}
          <div className="space-y-6 md:space-y-8">
            <h1 
              className="typeform-main-question text-center leading-tight transition-all duration-800 ease-out delay-200"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              That's it, you're all set!
            </h1>

            <div className="space-y-4 md:space-y-6">
              <p 
                className="text-xl md:text-2xl leading-relaxed transition-all duration-800 ease-out delay-400"
                style={{ 
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  color: '#5f4cdc',
                  fontWeight: 400,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                We will go through your profile. Until then…
              </p>

              {/* Gen Z style message blocks */}
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { icon: Sparkles, text: "keep the vibes high", delay: 600 },
                  { icon: Heart, text: "keep the charm alive", delay: 700 },
                  { icon: Zap, text: "and keep RIZZing 🔥", delay: 800 }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="px-6 py-4 rounded-2xl mx-auto transform hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ 
                      backgroundColor: 'rgba(95, 76, 220, 0.15)',
                      boxShadow: 'rgba(95, 76, 220, 0.2) 0px 8px 32px',
                      transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${index % 2 === 0 ? '-' : ''}30px) scale(0.9)`,
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${item.delay}ms`,
                      transitionDuration: '600ms',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <div className="flex items-center gap-3 justify-center">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#5f4cdc' }} />
                      <span 
                        className="text-lg md:text-xl font-medium"
                        style={{ 
                          fontFamily: 'Bricolage Grotesque, sans-serif',
                          color: '#5f4cdc'
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div 
        className="absolute bottom-8 left-8 transition-all duration-1000 ease-out delay-1200"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 0.6 : 0
        }}
      >
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: 'rgba(95, 76, 220, 0.4)' }}
        />
      </div>

      <div 
        className="absolute bottom-16 right-12 transition-all duration-1000 ease-out delay-1400"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 0.5 : 0
        }}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: 'rgba(95, 76, 220, 0.3)' }}
        />
      </div>

      <div 
        className="absolute top-1/3 right-16 transition-all duration-1000 ease-out delay-1600"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 0.4 : 0
        }}
      >
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'rgba(95, 76, 220, 0.4)' }}
        />
      </div>
    </div>
  );
}