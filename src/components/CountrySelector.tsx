import { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  flag: string;
  dialCode: string;
  name: string;
}

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

const countries: Country[] = [
  { code: 'AF', flag: '🇦🇫', dialCode: '+93', name: 'Afghanistan' },
  { code: 'AX', flag: '🇦🇽', dialCode: '+358', name: 'Aland Islands' },
  { code: 'AL', flag: '🇦🇱', dialCode: '+355', name: 'Albania' },
  { code: 'DZ', flag: '🇩🇿', dialCode: '+213', name: 'Algeria' },
  { code: 'AD', flag: '🇦🇩', dialCode: '+376', name: 'Andorra' },
  { code: 'AO', flag: '🇦🇴', dialCode: '+244', name: 'Angola' },
  { code: 'AR', flag: '🇦🇷', dialCode: '+54', name: 'Argentina' },
  { code: 'AM', flag: '🇦🇲', dialCode: '+374', name: 'Armenia' },
  { code: 'AU', flag: '🇦🇺', dialCode: '+61', name: 'Australia' },
  { code: 'AT', flag: '🇦🇹', dialCode: '+43', name: 'Austria' },
  { code: 'AZ', flag: '🇦🇿', dialCode: '+994', name: 'Azerbaijan' },
  { code: 'BS', flag: '🇧🇸', dialCode: '+1242', name: 'Bahamas' },
  { code: 'BH', flag: '🇧🇭', dialCode: '+973', name: 'Bahrain' },
  { code: 'BD', flag: '🇧🇩', dialCode: '+880', name: 'Bangladesh' },
  { code: 'BB', flag: '🇧🇧', dialCode: '+1246', name: 'Barbados' },
  { code: 'BY', flag: '🇧🇾', dialCode: '+375', name: 'Belarus' },
  { code: 'BE', flag: '🇧🇪', dialCode: '+32', name: 'Belgium' },
  { code: 'BZ', flag: '🇧🇿', dialCode: '+501', name: 'Belize' },
  { code: 'BJ', flag: '🇧🇯', dialCode: '+229', name: 'Benin' },
  { code: 'BT', flag: '🇧🇹', dialCode: '+975', name: 'Bhutan' },
  { code: 'BO', flag: '🇧🇴', dialCode: '+591', name: 'Bolivia' },
  { code: 'BA', flag: '🇧🇦', dialCode: '+387', name: 'Bosnia and Herzegovina' },
  { code: 'BW', flag: '🇧🇼', dialCode: '+267', name: 'Botswana' },
  { code: 'BR', flag: '🇧🇷', dialCode: '+55', name: 'Brazil' },
  { code: 'BN', flag: '🇧🇳', dialCode: '+673', name: 'Brunei' },
  { code: 'BG', flag: '🇧🇬', dialCode: '+359', name: 'Bulgaria' },
  { code: 'BF', flag: '🇧🇫', dialCode: '+226', name: 'Burkina Faso' },
  { code: 'BI', flag: '🇧🇮', dialCode: '+257', name: 'Burundi' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1', name: 'Canada' },
  { code: 'CV', flag: '🇨🇻', dialCode: '+238', name: 'Cape Verde' },
  { code: 'CL', flag: '🇨🇱', dialCode: '+56', name: 'Chile' },
  { code: 'CN', flag: '🇨🇳', dialCode: '+86', name: 'China' },
  { code: 'CO', flag: '🇨🇴', dialCode: '+57', name: 'Colombia' },
  { code: 'CR', flag: '🇨🇷', dialCode: '+506', name: 'Costa Rica' },
  { code: 'HR', flag: '🇭🇷', dialCode: '+385', name: 'Croatia' },
  { code: 'CU', flag: '🇨🇺', dialCode: '+53', name: 'Cuba' },
  { code: 'CY', flag: '🇨🇾', dialCode: '+357', name: 'Cyprus' },
  { code: 'CZ', flag: '🇨🇿', dialCode: '+420', name: 'Czech Republic' },
  { code: 'DK', flag: '🇩🇰', dialCode: '+45', name: 'Denmark' },
  { code: 'DJ', flag: '🇩🇯', dialCode: '+253', name: 'Djibouti' },
  { code: 'DO', flag: '🇩🇴', dialCode: '+1809', name: 'Dominican Republic' },
  { code: 'EC', flag: '🇪🇨', dialCode: '+593', name: 'Ecuador' },
  { code: 'EG', flag: '🇪🇬', dialCode: '+20', name: 'Egypt' },
  { code: 'SV', flag: '🇸🇻', dialCode: '+503', name: 'El Salvador' },
  { code: 'EE', flag: '🇪🇪', dialCode: '+372', name: 'Estonia' },
  { code: 'ET', flag: '🇪🇹', dialCode: '+251', name: 'Ethiopia' },
  { code: 'FI', flag: '🇫🇮', dialCode: '+358', name: 'Finland' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33', name: 'France' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49', name: 'Germany' },
  { code: 'GH', flag: '🇬🇭', dialCode: '+233', name: 'Ghana' },
  { code: 'GR', flag: '🇬🇷', dialCode: '+30', name: 'Greece' },
  { code: 'GT', flag: '🇬🇹', dialCode: '+502', name: 'Guatemala' },
  { code: 'HN', flag: '🇭🇳', dialCode: '+504', name: 'Honduras' },
  { code: 'HK', flag: '🇭🇰', dialCode: '+852', name: 'Hong Kong' },
  { code: 'HU', flag: '🇭🇺', dialCode: '+36', name: 'Hungary' },
  { code: 'IS', flag: '🇮🇸', dialCode: '+354', name: 'Iceland' },
  { code: 'IN', flag: '🇮🇳', dialCode: '+91', name: 'India' },
  { code: 'ID', flag: '🇮🇩', dialCode: '+62', name: 'Indonesia' },
  { code: 'IR', flag: '🇮🇷', dialCode: '+98', name: 'Iran' },
  { code: 'IQ', flag: '🇮🇶', dialCode: '+964', name: 'Iraq' },
  { code: 'IE', flag: '🇮🇪', dialCode: '+353', name: 'Ireland' },
  { code: 'IL', flag: '🇮🇱', dialCode: '+972', name: 'Israel' },
  { code: 'IT', flag: '🇮🇹', dialCode: '+39', name: 'Italy' },
  { code: 'JP', flag: '🇯🇵', dialCode: '+81', name: 'Japan' },
  { code: 'JO', flag: '🇯🇴', dialCode: '+962', name: 'Jordan' },
  { code: 'KZ', flag: '🇰🇿', dialCode: '+7', name: 'Kazakhstan' },
  { code: 'KE', flag: '🇰🇪', dialCode: '+254', name: 'Kenya' },
  { code: 'KR', flag: '🇰🇷', dialCode: '+82', name: 'South Korea' },
  { code: 'KW', flag: '🇰🇼', dialCode: '+965', name: 'Kuwait' },
  { code: 'LV', flag: '🇱🇻', dialCode: '+371', name: 'Latvia' },
  { code: 'LB', flag: '🇱🇧', dialCode: '+961', name: 'Lebanon' },
  { code: 'LT', flag: '🇱🇹', dialCode: '+370', name: 'Lithuania' },
  { code: 'LU', flag: '🇱🇺', dialCode: '+352', name: 'Luxembourg' },
  { code: 'MY', flag: '🇲🇾', dialCode: '+60', name: 'Malaysia' },
  { code: 'MX', flag: '🇲🇽', dialCode: '+52', name: 'Mexico' },
  { code: 'MA', flag: '🇲🇦', dialCode: '+212', name: 'Morocco' },
  { code: 'NL', flag: '🇳🇱', dialCode: '+31', name: 'Netherlands' },
  { code: 'NZ', flag: '🇳🇿', dialCode: '+64', name: 'New Zealand' },
  { code: 'NG', flag: '🇳🇬', dialCode: '+234', name: 'Nigeria' },
  { code: 'NO', flag: '🇳🇴', dialCode: '+47', name: 'Norway' },
  { code: 'PK', flag: '🇵🇰', dialCode: '+92', name: 'Pakistan' },
  { code: 'PE', flag: '🇵🇪', dialCode: '+51', name: 'Peru' },
  { code: 'PH', flag: '🇵🇭', dialCode: '+63', name: 'Philippines' },
  { code: 'PL', flag: '🇵🇱', dialCode: '+48', name: 'Poland' },
  { code: 'PT', flag: '🇵🇹', dialCode: '+351', name: 'Portugal' },
  { code: 'QA', flag: '🇶🇦', dialCode: '+974', name: 'Qatar' },
  { code: 'RO', flag: '🇷🇴', dialCode: '+40', name: 'Romania' },
  { code: 'RU', flag: '🇷🇺', dialCode: '+7', name: 'Russia' },
  { code: 'SA', flag: '🇸🇦', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'SG', flag: '🇸🇬', dialCode: '+65', name: 'Singapore' },
  { code: 'SK', flag: '🇸🇰', dialCode: '+421', name: 'Slovakia' },
  { code: 'SI', flag: '🇸🇮', dialCode: '+386', name: 'Slovenia' },
  { code: 'ZA', flag: '🇿🇦', dialCode: '+27', name: 'South Africa' },
  { code: 'ES', flag: '🇪🇸', dialCode: '+34', name: 'Spain' },
  { code: 'LK', flag: '🇱🇰', dialCode: '+94', name: 'Sri Lanka' },
  { code: 'SE', flag: '🇸🇪', dialCode: '+46', name: 'Sweden' },
  { code: 'CH', flag: '🇨🇭', dialCode: '+41', name: 'Switzerland' },
  { code: 'TW', flag: '🇹🇼', dialCode: '+886', name: 'Taiwan' },
  { code: 'TH', flag: '🇹🇭', dialCode: '+66', name: 'Thailand' },
  { code: 'TR', flag: '🇹🇷', dialCode: '+90', name: 'Turkey' },
  { code: 'UA', flag: '🇺🇦', dialCode: '+380', name: 'Ukraine' },
  { code: 'AE', flag: '🇦🇪', dialCode: '+971', name: 'United Arab Emirates' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44', name: 'United Kingdom' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1', name: 'United States' },
  { code: 'UY', flag: '🇺🇾', dialCode: '+598', name: 'Uruguay' },
  { code: 'VE', flag: '🇻🇪', dialCode: '+58', name: 'Venezuela' },
  { code: 'VN', flag: '🇻🇳', dialCode: '+84', name: 'Vietnam' },
  { code: 'ZW', flag: '🇿🇼', dialCode: '+263', name: 'Zimbabwe' }
];

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountryData = countries.find(c => c.code === selectedCountry) || countries.find(c => c.code === 'US')!;

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent border-0 p-0 focus:outline-none"
      >
        <span className="text-xl">{selectedCountryData.flag}</span>
        <ChevronDown className="w-3 h-3 text-blue-600" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute top-8 left-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          style={{ backgroundColor: '#c5ff00' }}
        >
          {/* Search input */}
          <div className="p-4 border-b border-blue-600/20">
            <Input
              type="text"
              placeholder="Search countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-blue-600/30 rounded-none px-0 py-2 text-blue-600 placeholder:text-blue-600/50 focus:ring-0 focus:border-blue-600"
              style={{ boxShadow: 'none', fontFamily: 'Darker Grotesque, sans-serif' }}
              autoFocus
            />
          </div>

          {/* Countries list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country.code)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-600/10 transition-colors border-b border-blue-600/10 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{country.flag}</span>
                  <span className="typeform-option-text text-blue-600">{country.name}</span>
                </div>
                <span className="typeform-option-text text-blue-600">{country.dialCode}</span>
              </button>
            ))}
          </div>

          {/* No results */}
          {filteredCountries.length === 0 && (
            <div className="p-4 text-center text-blue-600/70">
              No countries found
            </div>
          )}
        </div>
      )}
    </div>
  );
}