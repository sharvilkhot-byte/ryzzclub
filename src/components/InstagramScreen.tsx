import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';

interface InstagramScreenProps {
  onNext: (instagram: string) => void;
  onBack: () => void;
}

export function InstagramScreen({ onNext, onBack }: InstagramScreenProps) {
  const [instagram, setInstagram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instagram.trim()) {
      onNext(instagram);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove @ symbol if user types it
    if (value.startsWith('@')) {
      value = value.substring(1);
    }
    
    // Only allow valid Instagram username characters (letters, numbers, periods, underscores)
    value = value.replace(/[^a-zA-Z0-9._]/g, '');
    
    setInstagram(value);
  };

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>10</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-4 md:mb-6">
            Your Instagram*
          </h1>

          {/* Subtitle */}
          <p className="typeform-subtext mb-8 md:mb-12">
            Make sure to follow @ryzz.club for us to vet your profile. We will follow you back for private accounts.
          </p>

          {/* Input field */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="relative">
              <div className="flex items-center">
                <span className="text-lg md:text-xl mr-1" style={{ fontFamily: 'Darker Grotesque, sans-serif', color: '#5f4cdc' }}>@</span>
                <Input
                  type="text"
                  value={instagram}
                  onChange={handleInstagramChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="flex-1 bg-transparent border-0 border-b-2 rounded-none px-0 py-3 md:py-4 text-lg md:text-xl focus:ring-0 focus:border-b-2"
                  style={{ borderBottomColor: '#5f4cdc', color: '#5f4cdc', boxShadow: 'none', fontFamily: 'Darker Grotesque, sans-serif' }}
                  autoFocus
                />
              </div>
              {instagram && (
                <div className="absolute left-6 bottom-0 h-0.5 transition-all duration-300 ease-out"
                     style={{ backgroundColor: '#5f4cdc', width: `${Math.min(instagram.length * 8, 100)}%` }} />
              )}
            </div>

            {/* Submit button and hint */}
            <div className="flex items-center gap-4 md:gap-6">
              <Button
                type="submit"
                disabled={!instagram.trim()}
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