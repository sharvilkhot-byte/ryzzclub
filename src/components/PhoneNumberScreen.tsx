import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, ArrowRight, ChevronUp } from 'lucide-react';
import { CountrySelector } from './CountrySelector';

interface PhoneNumberScreenProps {
  onNext: (phoneNumber: string, countryCode: string) => void;
  onBack: () => void;
}

const countries = [
  { code: 'US', flag: '🇺🇸', dialCode: '+1', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', dialCode: '+61', name: 'Australia' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33', name: 'France' },
  { code: 'IN', flag: '🇮🇳', dialCode: '+91', name: 'India' },
  { code: 'JP', flag: '🇯🇵', dialCode: '+81', name: 'Japan' },
];

export function PhoneNumberScreen({ onNext, onBack }: PhoneNumberScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on selected country
    if (selectedCountry === 'IN') {
      // For India, limit to 10 digits and format as XXXXX XXXXX
      const limited = cleaned.slice(0, 10);
      if (limited.length <= 5) {
        return limited;
      }
      return `${limited.slice(0, 5)} ${limited.slice(5)}`;
    } else if (selectedCountry === 'US' || selectedCountry === 'CA') {
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
      }
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    
    // Validate based on selected country
    if (selectedCountry === 'IN') {
      // For India, require exactly 10 digits
      if (cleanedNumber.length === 10) {
        const selectedCountryData = countries.find(c => c.code === selectedCountry);
        onNext(phoneNumber, selectedCountryData?.dialCode || '+91');
      }
    } else {
      // For other countries, just check if not empty
      if (phoneNumber.trim()) {
        const selectedCountryData = countries.find(c => c.code === selectedCountry);
        onNext(phoneNumber, selectedCountryData?.dialCode || '+91');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const selectedCountryData = countries.find(c => c.code === selectedCountry) || countries[0];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>


      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>2</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-8 md:mb-12">
            Your phone number*
          </h1>

          {/* Subtitle */}
          <p className="typeform-subtext mb-12 md:mb-16">
            We won't spam you, just for verification purposes
          </p>

          {/* Phone input with country selector */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 border-b-2 pb-3" style={{ borderBottomColor: '#5f4cdc' }}>
              {/* Country selector */}
              <CountrySelector 
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />

              {/* Phone number input */}
              <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                onKeyPress={handleKeyPress}
                placeholder="98765 43210"
                className="flex-1 bg-transparent border-0 rounded-none px-0 py-0 text-lg md:text-xl focus:ring-0 focus:border-0"
                style={{ color: '#5f4cdc', boxShadow: 'none', fontFamily: 'Darker Grotesque, sans-serif' }}
                autoFocus
              />
            </div>

            {/* Submit button and hint */}
            <div className="flex items-center gap-4 md:gap-6">
              <Button
                type="submit"
                disabled={selectedCountry === 'IN' ? phoneNumber.replace(/\D/g, '').length !== 10 : !phoneNumber.trim()}
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