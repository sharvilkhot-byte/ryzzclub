import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Part1CompletionScreen({ continueLink }: { continueLink?: string }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#c5ff00' }}>
      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <div className="flex justify-center mb-12">
          <CheckCircle className="w-24 h-24" style={{ color: '#5f4cdc' }} />
        </div>

        <h1 className="text-4xl md:text-6xl mb-6 leading-tight" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 700 }}>
          You're half way there!
        </h1>

        <p className="text-xl md:text-2xl mb-8 opacity-80" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
          Thank you for completing the first part of the profiling questions.
        </p>
        
        <p className="text-lg md:text-xl font-medium" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
          We will send you a personalized link using the contact information provided so you can complete the rest of the questions at your convenience!
        </p>

        {continueLink && (
           <div className="mt-8 p-4 rounded-lg bg-white/20 border border-[#5f4cdc]/30 inline-block text-left w-full overflow-hidden">
               <p className="text-sm text-[#5f4cdc] font-bold mb-2">Debug / Magic Link:</p>
               <input 
                  type="text" 
                  readOnly 
                  value={continueLink} 
                  className="w-full bg-transparent border-none text-[#5f4cdc] font-mono text-sm outline-none cursor-text" 
                  onClick={(e) => e.currentTarget.select()}
               />
               <p className="text-xs text-[#5f4cdc]/60 mt-2">Admins can also copy this link from the dashboard.</p>
           </div>
        )}
      </div>
    </div>
  );
}
