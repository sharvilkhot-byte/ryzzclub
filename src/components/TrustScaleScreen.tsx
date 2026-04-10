import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';

interface TrustScaleScreenProps {
  onNext: (rating: string) => void;
  onBack: () => void;
}

export function TrustScaleScreen({ onNext, onBack }: TrustScaleScreenProps) {
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
        <div className="max-w-4xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>22</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-8 md:mb-12">
            What's your trust scale looking like?*
          </h1>

          {/* Scale labels */}
          <div className="mb-12 md:mb-16">
            <p className="typeform-subtext mb-1">
              0: I don't trust no one
            </p>
            <p className="typeform-subtext">
              10: Everyone is a great person
            </p>
          </div>

          {/* Rating scale */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-6 md:space-y-8">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingSelect(rating)}
                  className={`typeform-option-box w-12 h-12 md:w-14 md:h-14 rounded-lg transition-all duration-200 flex items-center justify-center`}
                  style={{ 
                    fontFamily: 'Darker Grotesque, sans-serif', 
                    fontWeight: 600,
                    ...(selectedRating === rating ? {
                      backgroundColor: '#5f4cdc',
                      boxShadow: 'rgba(95, 76, 220, 1) 0px 0px 0px 2px inset'
                    } : {})
                  }}
                >
                  <span 
                    className="typeform-option-text"
                    style={{
                      color: selectedRating === rating ? 'white' : 'rgb(95, 76, 220)'
                    }}
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