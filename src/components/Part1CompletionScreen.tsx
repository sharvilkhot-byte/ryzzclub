import { useState } from 'react';
import { CheckCircle, Copy, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';

export function Part1CompletionScreen({ continueLink, onContinueNow }: { continueLink?: string, onContinueNow: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (continueLink) {
      navigator.clipboard.writeText(continueLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#c5ff00' }}>
      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-24 h-24" style={{ color: '#5f4cdc' }} />
        </div>

        <h1 className="text-4xl md:text-6xl mb-4 leading-tight" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 700 }}>
          You're half way there!
        </h1>

        <p className="text-xl md:text-2xl mb-8" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
          Thank you for completing the first part of the questions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button 
            onClick={onContinueNow}
            className="w-full sm:w-auto text-white px-8 py-6 text-xl rounded-xl transition-all"
            style={{ backgroundColor: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600 }}
          >
            Continue Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {continueLink && (
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-xl rounded-xl border-2 transition-all"
              style={{ 
                color: '#5f4cdc', 
                borderColor: '#5f4cdc',
                backgroundColor: 'transparent',
                fontFamily: 'Darker Grotesque, sans-serif', 
                fontWeight: 600 
              }}
            >
              {copied ? (
                <><Check className="mr-2 w-5 h-5" /> Copied!</>
              ) : (
                <><Copy className="mr-2 w-5 h-5" /> Copy Link and Continue Later</>
              )}
            </Button>
          )}
        </div>

        {continueLink && (
          <p className="text-sm mt-6 opacity-80" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
            We've also saved your progress. Save this link to resume later!
          </p>
        )}
      </div>
    </div>
  );
}
