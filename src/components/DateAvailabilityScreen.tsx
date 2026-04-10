import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';

interface DateAvailabilityScreenProps {
  onNext: (days: string[]) => void;
  onBack: () => void;
}

export function DateAvailabilityScreen({ onNext, onBack }: DateAvailabilityScreenProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDays.length > 0) {
      onNext(selectedDays);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedDays.length > 0) {
      handleSubmit(e);
    }
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const days = [
    { id: 'Monday', label: 'Monday', letter: 'A' },
    { id: 'Tuesday', label: 'Tuesday', letter: 'B' },
    { id: 'Wednesday', label: 'Wednesday', letter: 'C' },
    { id: 'Thursday', label: 'Thursday', letter: 'D' },
    { id: 'Friday', label: 'Friday', letter: 'E' },
    { id: 'Saturday', label: 'Saturday', letter: 'F' },
    { id: 'Sunday', label: 'Sunday', letter: 'G' }
  ];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>9</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-8 md:mb-12">
            Which days work best for you to go on a date?*
          </h1>

          {/* Subtitle */}
          <p className="typeform-subtext mb-12 md:mb-16">
            Choose as many as you like
          </p>

          {/* Options */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-4 md:space-y-6">
            <div className="space-y-3">
              {days.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDayToggle(day.id)}
                  className={`typeform-option-box w-full text-left px-4 py-3 md:px-6 md:py-4 rounded-lg transition-all duration-200 ${
                    selectedDays.includes(day.id)
                      ? ''
                      : ''
                  }`}
                  style={{ 
                    fontFamily: 'Darker Grotesque, sans-serif',
                    ...(selectedDays.includes(day.id) ? {
                      backgroundColor: 'rgba(95, 76, 220, 0.15)',
                      boxShadow: 'rgba(95, 76, 220, 0.8) 0px 0px 0px 2px inset'
                    } : {})
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 text-white rounded flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: '#5f4cdc' }}>
                      {day.letter}
                    </span>
                    <span className="typeform-option-text flex-1">{day.label}</span>
                    {selectedDays.includes(day.id) && (
                      <Check className="w-5 h-5" style={{ color: '#5f4cdc' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-4 md:pt-6">
              <div className="flex items-center gap-4 md:gap-6">
                <Button
                  type="submit"
                  disabled={selectedDays.length === 0}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}