import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';

interface GangScreenProps {
  onNext: (gang: string) => void;
  onBack: () => void;
}

export function GangScreen({ onNext, onBack }: GangScreenProps) {
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
    { id: 'Collaborative and supportive', label: 'Collaborative and supportive', letter: 'A' },
    { id: 'Competitive and driven', label: 'Competitive and driven', letter: 'B' },
    { id: 'Creative and innovative', label: 'Creative and innovative', letter: 'C' },
    { id: 'Organized and efficient', label: 'Organized and efficient', letter: 'D' },
    { id: 'Flexible and adaptable', label: 'Flexible and adaptable', letter: 'E' }
  ];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 text-lg md:text-xl">21</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-4 md:mb-6">
            A gang you'd like to be part of would be?
          </h1>

          {/* Instruction text */}
          <p className="mb-6 md:mb-8" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: '16px', fontWeight: 400, height: 'auto', lineHeight: '24px', color: 'rgba(95, 76, 220, 0.7)' }}>
            Choose one non-negotiable.*
          </p>

          {/* Options */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-4 md:space-y-6">
            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left px-4 py-3 md:px-6 md:py-4 border-2 rounded-lg transition-all duration-200 ${
                    selectedOption === option.id
                      ? 'border-blue-600 bg-blue-600/10'
                      : 'border-blue-600/30 hover:border-blue-600 hover:bg-blue-600/5'
                  }`}
                  style={{ fontFamily: 'Darker Grotesque, sans-serif' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm font-semibold">
                      {option.letter}
                    </span>
                    <span className="typeform-option-text text-blue-600">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-4 md:pt-6">
              <Button
                type="submit"
                disabled={!selectedOption}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600 }}
              >
                OK
              </Button>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}