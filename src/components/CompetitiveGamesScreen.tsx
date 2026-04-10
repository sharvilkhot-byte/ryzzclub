import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';

interface CompetitiveGamesScreenProps {
  onNext: (rating: string) => void;
  onBack: () => void;
}

export function CompetitiveGamesScreen({ onNext, onBack }: CompetitiveGamesScreenProps) {
  const [selectedRating, setSelectedRating] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating) {
      onNext(selectedRating);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedRating) {
      handleSubmit(e);
    }
  };

  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating);
  };

  const ratings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>30</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-6 md:mb-8">
            How competitive do you get in group games or activities?*
          </h1>

          {/* Scale labels */}
          <div className="flex justify-between mb-6 md:mb-8">
            <span className="text-sm md:text-base" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: '16px', fontWeight: 400, height: 'auto', lineHeight: '24px', color: 'rgba(95, 76, 220, 0.7)' }}>
              0: I don't really care about winning
            </span>
            <span className="text-sm md:text-base" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: '16px', fontWeight: 400, height: 'auto', lineHeight: '24px', color: 'rgba(95, 76, 220, 0.7)' }}>
              10: I need to win at all costs!
            </span>
          </div>

          {/* Rating scale */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-6 md:space-y-8">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingSelect(rating)}
                  className="w-10 h-10 md:w-12 md:h-12 border-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                  style={selectedRating === rating 
                    ? { borderColor: '#5f4cdc', backgroundColor: '#5f4cdc', color: 'white', fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600 }
                    : { borderColor: '#5f4cdc', color: '#5f4cdc', backgroundColor: 'transparent', fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600 }
                  }
                  onMouseEnter={(e) => {
                    if (selectedRating !== rating) {
                      e.currentTarget.style.backgroundColor = 'rgba(95, 76, 220, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRating !== rating) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span 
                    className="typeform-option-text"
                    style={selectedRating === rating ? { color: 'white' } : {}}
                  >
                    {rating}
                  </span>
                </button>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-4 md:pt-6">
              <Button
                type="submit"
                disabled={!selectedRating}
                className="text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600, backgroundColor: '#5f4cdc' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a3bb8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5f4cdc'}
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