import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface LocationScreenProps {
  onNext: (location: string) => void;
  onBack: () => void;
}

export function LocationScreen({ onNext, onBack }: LocationScreenProps) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onNext(location.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>
      {/* Top left icon */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#5f4cdc' }} />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>7</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-4 md:mb-6">
            Where do you live?*
          </h1>

          {/* Subtitle */}
          <p className="typeform-subtext mb-8 md:mb-12 text-[16px]">
            City, country or region
          </p>

          {/* Input field */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="relative">
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                className="w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 md:py-4 text-lg md:text-xl focus:ring-0 focus:border-b-2"
                style={{ borderBottomColor: '#5f4cdc', color: '#5f4cdc', boxShadow: 'none', fontFamily: 'Darker Grotesque, sans-serif' }}
                autoFocus
              />
              {location && (
                <div className="absolute left-0 bottom-0 h-0.5 transition-all duration-300 ease-out"
                     style={{ width: `${Math.min(location.length * 8, 100)}%`, backgroundColor: '#5f4cdc' }} />
              )}
            </div>

            {/* Submit button and hint */}
            <div className="flex items-center gap-4 md:gap-6">
              <Button
                type="submit"
                disabled={!location.trim()}
                className="text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600, backgroundColor: '#5f4cdc' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a3bb8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5f4cdc'}
              >
                OK
              </Button>
              <span className="text-sm md:text-base" style={{ fontFamily: 'Instrument Serif, serif', color: 'rgba(95, 76, 220, 0.8)' }}>
                press Enter ↵
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}