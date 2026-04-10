import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';

interface AliveWhenScreenProps {
  onNext: (choice: string) => void;
  onBack: () => void;
}

export function AliveWhenScreen({ onNext, onBack }: AliveWhenScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onNext(selectedOption);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedOption) {
      handleSubmit(e);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const options = [
    { id: 'achieving-goal', label: 'Achieving a goal', letter: 'A' },
    { id: 'helping-others', label: 'Helping others', letter: 'B' },
    { id: 'exploring-places', label: 'Exploring new places', letter: 'C' },
    { id: 'in-bed', label: "I'm in ma bed.", letter: 'D' },
    { id: 'connecting-people', label: 'Connecting with people', letter: 'E' }
  ];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>25</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-12 md:mb-16">
            You feel most alive when -*
          </h1>

          {/* Options */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-4 md:space-y-6">
            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  className={`typeform-option-box w-full text-left px-4 py-3 md:px-6 md:py-4 rounded-lg transition-all duration-200`}
                  style={{ 
                    fontFamily: 'Darker Grotesque, sans-serif',
                    ...(selectedOption === option.id ? {
                      backgroundColor: 'rgba(95, 76, 220, 0.15)',
                      boxShadow: 'rgba(95, 76, 220, 0.8) 0px 0px 0px 2px inset'
                    } : {})
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 text-white rounded flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: '#5f4cdc' }}>
                      {option.letter}
                    </span>
                    <span className="typeform-option-text">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-4 md:pt-6">
              <div className="flex items-center gap-4 md:gap-6">
                <Button
                  type="submit"
                  disabled={!selectedOption}
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