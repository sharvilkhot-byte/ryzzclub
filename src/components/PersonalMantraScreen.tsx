import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, ArrowRight, ChevronUp, Loader2, AlertCircle } from 'lucide-react';

interface PersonalMantraScreenProps {
  onNext: (mantra: string) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  submissionError?: string | null;
}

export function PersonalMantraScreen({ onNext, onBack, isSubmitting = false, submissionError }: PersonalMantraScreenProps) {
  const [mantra, setMantra] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mantra.trim() && !isSubmitting) {
      onNext(mantra.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && mantra.trim() && !isSubmitting) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>31</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-4 md:mb-6">
            A personal mantra is?*
          </h1>

          {/* Description */}
          <p className="typeform-subtext mb-6 md:mb-8">
            Write one line or one word to summarise your life's north star.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-6 md:space-y-8">
            <div className="relative">
              <Input
                type="text"
                value={mantra}
                onChange={(e) => setMantra(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 md:py-4 focus:outline-none focus:ring-0 text-base md:text-lg"
                style={{ borderBottomColor: '#5f4cdc', color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}
                disabled={isSubmitting}
              />
            </div>

            {/* Error message */}
            {submissionError && (
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />
                <span className="text-sm" style={{ color: '#ef4444', fontFamily: 'Darker Grotesque, sans-serif' }}>
                  {submissionError}
                </span>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={!mantra.trim() || isSubmitting}
                className="text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600, backgroundColor: '#5f4cdc' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a3bb8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5f4cdc'}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <span className="text-sm md:text-base" style={{ fontFamily: 'Darker Grotesque, sans-serif', color: 'rgba(95, 76, 220, 0.7)' }}>
                press Ctrl + Enter ↵
              </span>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}