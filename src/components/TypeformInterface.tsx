import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { PhoneNumberScreen } from './PhoneNumberScreen';
import { EmailScreen } from './EmailScreen';
import { Part1CompletionScreen } from './Part1CompletionScreen';
import { AgeScreen } from './AgeScreen';
import { LocationScreen } from './LocationScreen';
import { InstagramScreen } from './InstagramScreen';
import { SpotifyScreen } from './SpotifyScreen';
import { RelationshipScreen } from './RelationshipScreen';
import { DinnerBudgetScreen } from './DinnerBudgetScreen';
import { VibeScreen } from './VibeScreen';
import { SoundtrackScreen } from './SoundtrackScreen';
import { AttentionRatingScreen } from './AttentionRatingScreen';
import { DinnerOrderScreen } from './DinnerOrderScreen';
import { WeekendPersonaScreen } from './WeekendPersonaScreen';
import { GoToOutfitScreen } from './GoToOutfitScreen';
import { RestaurantNoticeScreen } from './RestaurantNoticeScreen';
import { FriendshipIngredientScreen } from './FriendshipIngredientScreen';
import { GangScreen } from './GangScreen';
import { TrustScaleScreen } from './TrustScaleScreen';
import { ExperiencePreferenceScreen } from './ExperiencePreferenceScreen';
import { DilemmaDecisionScreen } from './DilemmaDecisionScreen';
import { AliveWhenScreen } from './AliveWhenScreen';
import { TrySomethingNewScreen } from './TrySomethingNewScreen';
import { AdventurousScaleScreen } from './AdventurousScaleScreen';
import { RiskTakingScreen } from './RiskTakingScreen';
import { DeepConversationScreen } from './DeepConversationScreen';
import { CompetitiveGamesScreen } from './CompetitiveGamesScreen';
import { PersonalMantraScreen } from './PersonalMantraScreen';
import { GenderIdentityScreen } from './GenderIdentityScreen';
import { AttractionScreen } from './AttractionScreen';
import { DateAvailabilityScreen } from './DateAvailabilityScreen';
import { CompletionScreen } from './CompletionScreen';

interface FormData {
  id?: string;
  email: string;
  name: string;
  phoneNumber: string;
  countryCode: string;
  age: string;
  location: string;
  genderIdentity: string;
  attraction: string;
  dateAvailability: string[];
  instagram: string;
  spotify: string;
  relationship: string;
  dinnerBudget: string;
  vibe: string;
  soundtrack: string;
  attentionRating: string;
  dinnerOrder: string;
  weekendPersona: string;
  goToOutfit: string;
  restaurantNotice: string;
  friendshipIngredient: string;
  gang: string;
  trustScale: string;
  experiencePreference: string;
  dilemmaDecision: string;
  aliveWhen: string;
  trySomethingNew: string;
  adventurousScale: string;
  riskTaking: string;
  deepConversation: string;
  competitiveGames: string;
  personalMantra: string;
}

export function TypeformInterface() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [continueLink, setContinueLink] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userId) {
      const fetchExistingData = async () => {
        try {
          const response = await fetch(`https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submission/${userId}`, {
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA' }
          });
          const result = await response.json();
          if (response.ok && result.submission) {
             setFormData(result.submission);
             setCurrentStep(8);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchExistingData();
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    countryCode: '+91',
    age: '',
    location: '',
    genderIdentity: '',
    attraction: '',
    dateAvailability: [],
    instagram: '',
    spotify: '',
    relationship: '',
    dinnerBudget: '',
    vibe: '',
    soundtrack: '',
    attentionRating: '',
    dinnerOrder: '',
    weekendPersona: '',
    goToOutfit: '',
    restaurantNotice: '',
    friendshipIngredient: '',
    gang: '',
    trustScale: '',
    experiencePreference: '',
    dilemmaDecision: '',
    aliveWhen: '',
    trySomethingNew: '',
    adventurousScale: '',
    riskTaking: '',
    deepConversation: '',
    competitiveGames: '',
    personalMantra: ''
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      console.log('Name submitted:', formData.name);
      setCurrentStep(2);
    }
  };


  const handleEmailSubmit = async (email: string) => {
    const finalData = { ...formData, email };
    setFormData(finalData);
    
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const response = await fetch(`https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submit-part1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        },
        body: JSON.stringify(finalData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      setContinueLink(result.continueLink);
      setCurrentStep(7); // Part 1 Complete Screen
    } catch (error) {
      console.error(error);
      setSubmissionError(error instanceof Error ? error.message : 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = (phoneNumber: string, countryCode: string) => {
    setFormData(prev => ({ ...prev, phoneNumber, countryCode }));
    console.log('Phone submitted:', { phoneNumber, countryCode });
    setCurrentStep(3);
  };

  const handleAgeSubmit = (age: string) => {
    setFormData(prev => ({ ...prev, age }));
    console.log('Age submitted:', age);
    setCurrentStep(5);
  };

  const handleLocationSubmit = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    console.log('Location submitted:', location);
    setCurrentStep(9);
  };

const handleGenderIdentitySubmit = (genderIdentity: string) => {
    setFormData(prev => ({ ...prev, genderIdentity }));
    console.log('Gender identity submitted:', genderIdentity);
    setCurrentStep(4);
  };

  const handleAttractionSubmit = (attraction: string) => {
    setFormData(prev => ({ ...prev, attraction }));
    console.log('Attraction submitted:', attraction);
    setCurrentStep(10);
  };

  const handleDateAvailabilitySubmit = (dateAvailability: string[]) => {
    setFormData(prev => ({ ...prev, dateAvailability }));
    console.log('Date availability submitted:', dateAvailability);
    setCurrentStep(11);
  };

  const handleInstagramSubmit = (instagram: string) => {
    setFormData(prev => ({ ...prev, instagram }));
    console.log('Instagram submitted:', instagram);
    setCurrentStep(12);
  };

  const handleSpotifySubmit = (spotify: string) => {
    setFormData(prev => ({ ...prev, spotify }));
    console.log('Spotify submitted:', spotify);
    setCurrentStep(13);
  };

  const handleRelationshipSubmit = (relationship: string) => {
    setFormData(prev => ({ ...prev, relationship }));
    console.log('Relationship submitted:', relationship);
    setCurrentStep(6);
  };

  const handleDinnerBudgetSubmit = (dinnerBudget: string) => {
    setFormData(prev => ({ ...prev, dinnerBudget }));
    console.log('Dinner budget submitted:', dinnerBudget);
    setCurrentStep(14);
  };

  const handleVibeSubmit = (vibe: string) => {
    setFormData(prev => ({ ...prev, vibe }));
    console.log('Vibe submitted:', vibe);
    setCurrentStep(15);
  };

  const handleSoundtrackSubmit = (soundtrack: string) => {
    setFormData(prev => ({ ...prev, soundtrack }));
    console.log('Soundtrack submitted:', soundtrack);
    setCurrentStep(16);
  };

  const handleAttentionRatingSubmit = (attentionRating: string) => {
    setFormData(prev => ({ ...prev, attentionRating }));
    console.log('Attention rating submitted:', attentionRating);
    setCurrentStep(17);
  };

  const handleDinnerOrderSubmit = (dinnerOrder: string) => {
    setFormData(prev => ({ ...prev, dinnerOrder }));
    console.log('Dinner order submitted:', dinnerOrder);
    setCurrentStep(18);
  };

  const handleWeekendPersonaSubmit = (weekendPersona: string) => {
    setFormData(prev => ({ ...prev, weekendPersona }));
    console.log('Weekend persona submitted:', weekendPersona);
    setCurrentStep(19);
  };

  const handleGoToOutfitSubmit = (goToOutfit: string) => {
    setFormData(prev => ({ ...prev, goToOutfit }));
    console.log('Go-to outfit submitted:', goToOutfit);
    setCurrentStep(20);
  };

  const handleRestaurantNoticeSubmit = (restaurantNotice: string) => {
    setFormData(prev => ({ ...prev, restaurantNotice }));
    console.log('Restaurant notice submitted:', restaurantNotice);
    setCurrentStep(21);
  };

  const handleFriendshipIngredientSubmit = (friendshipIngredient: string) => {
    setFormData(prev => ({ ...prev, friendshipIngredient }));
    console.log('Friendship ingredient submitted:', friendshipIngredient);
    setCurrentStep(22);
  };

  const handleGangSubmit = (gang: string) => {
    setFormData(prev => ({ ...prev, gang }));
    console.log('Gang submitted:', gang);
    setCurrentStep(23);
  };

  const handleTrustScaleSubmit = (trustScale: string) => {
    setFormData(prev => ({ ...prev, trustScale }));
    console.log('Trust scale submitted:', trustScale);
    setCurrentStep(24);
  };

  const handleExperiencePreferenceSubmit = (experiencePreference: string) => {
    setFormData(prev => ({ ...prev, experiencePreference }));
    console.log('Experience preference submitted:', experiencePreference);
    setCurrentStep(25);
  };

  const handleDilemmaDecisionSubmit = (dilemmaDecision: string) => {
    setFormData(prev => ({ ...prev, dilemmaDecision }));
    console.log('Dilemma decision submitted:', dilemmaDecision);
    setCurrentStep(26);
  };

  const handleAliveWhenSubmit = (aliveWhen: string) => {
    setFormData(prev => ({ ...prev, aliveWhen }));
    console.log('Alive when submitted:', aliveWhen);
    setCurrentStep(27);
  };

  const handleTrySomethingNewSubmit = (trySomethingNew: string) => {
    setFormData(prev => ({ ...prev, trySomethingNew }));
    console.log('Try something new submitted:', trySomethingNew);
    setCurrentStep(28);
  };

  const handleAdventurousScaleSubmit = (adventurousScale: string) => {
    setFormData(prev => ({ ...prev, adventurousScale }));
    console.log('Adventurous scale submitted:', adventurousScale);
    setCurrentStep(29);
  };

  const handleRiskTakingSubmit = (riskTaking: string) => {
    setFormData(prev => ({ ...prev, riskTaking }));
    console.log('Risk taking submitted:', riskTaking);
    setCurrentStep(30);
  };

  const handleDeepConversationSubmit = (deepConversation: string) => {
    setFormData(prev => ({ ...prev, deepConversation }));
    console.log('Deep conversation submitted:', deepConversation);
    setCurrentStep(31);
  };

  const handleCompetitiveGamesSubmit = (competitiveGames: string) => {
    setFormData(prev => ({ ...prev, competitiveGames }));
    console.log('Competitive games submitted:', competitiveGames);
    setCurrentStep(32);
  };

  const handlePersonalMantraSubmit = async (personalMantra: string) => {
    const finalFormData = { ...formData, personalMantra };
    setFormData(finalFormData);
    console.log('Personal mantra submitted:', personalMantra);
    console.log('Complete form data:', finalFormData);
    
    // Submit form to Supabase
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      const response = await fetch('https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        },
        body: JSON.stringify(finalFormData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', result);
      setCurrentStep(33);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit(e);
    }
  };


  if (currentStep === 2) {
    return (
      <PhoneNumberScreen 
        onNext={handlePhoneSubmit}
        onBack={() => setCurrentStep(1)}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <GenderIdentityScreen 
        onNext={handleGenderIdentitySubmit}
        onBack={() => setCurrentStep(2)}
      />
    );
  }

  if (currentStep === 4) {
    return (
      <AgeScreen 
        onNext={handleAgeSubmit}
        onBack={() => setCurrentStep(3)}
      />
    );
  }

  if (currentStep === 5) {
    return (
      <RelationshipScreen 
        onNext={handleRelationshipSubmit}
        onBack={() => setCurrentStep(4)}
      />
    );
  }

  if (currentStep === 6) {
    return (
      <EmailScreen 
        onNext={handleEmailSubmit}
        onBack={() => setCurrentStep(5)}
      />
    );
  }

  if (currentStep === 7) {
    return <Part1CompletionScreen continueLink={continueLink} onContinueNow={() => setCurrentStep(8)} />;
  }

  if (currentStep === 8) {
    return (
      <LocationScreen 
        onNext={handleLocationSubmit}
        onBack={() => setCurrentStep(8)}
      />
    );
  }

  if (currentStep === 9) {
    return (
      <AttractionScreen 
        onNext={handleAttractionSubmit}
        onBack={() => setCurrentStep(8)}
      />
    );
  }

  if (currentStep === 10) {
    return (
      <DateAvailabilityScreen 
        onNext={handleDateAvailabilitySubmit}
        onBack={() => setCurrentStep(9)}
      />
    );
  }

  if (currentStep === 11) {
    return (
      <InstagramScreen 
        onNext={handleInstagramSubmit}
        onBack={() => setCurrentStep(10)}
      />
    );
  }

  if (currentStep === 12) {
    return (
      <SpotifyScreen 
        onNext={handleSpotifySubmit}
        onBack={() => setCurrentStep(11)}
      />
    );
  }

  if (currentStep === 13) {
    return (
      <DinnerBudgetScreen 
        onNext={handleDinnerBudgetSubmit}
        onBack={() => setCurrentStep(12)}
      />
    );
  }

  if (currentStep === 14) {
    return (
      <VibeScreen 
        onNext={handleVibeSubmit}
        onBack={() => setCurrentStep(13)}
      />
    );
  }

  if (currentStep === 15) {
    return (
      <SoundtrackScreen 
        onNext={handleSoundtrackSubmit}
        onBack={() => setCurrentStep(14)}
      />
    );
  }

  if (currentStep === 16) {
    return (
      <AttentionRatingScreen 
        onNext={handleAttentionRatingSubmit}
        onBack={() => setCurrentStep(15)}
      />
    );
  }

  if (currentStep === 17) {
    return (
      <DinnerOrderScreen 
        onNext={handleDinnerOrderSubmit}
        onBack={() => setCurrentStep(16)}
      />
    );
  }

  if (currentStep === 18) {
    return (
      <WeekendPersonaScreen 
        onNext={handleWeekendPersonaSubmit}
        onBack={() => setCurrentStep(17)}
      />
    );
  }

  if (currentStep === 19) {
    return (
      <GoToOutfitScreen 
        onNext={handleGoToOutfitSubmit}
        onBack={() => setCurrentStep(18)}
      />
    );
  }

  if (currentStep === 20) {
    return (
      <RestaurantNoticeScreen 
        onNext={handleRestaurantNoticeSubmit}
        onBack={() => setCurrentStep(19)}
      />
    );
  }

  if (currentStep === 21) {
    return (
      <FriendshipIngredientScreen 
        onNext={handleFriendshipIngredientSubmit}
        onBack={() => setCurrentStep(20)}
      />
    );
  }

  if (currentStep === 22) {
    return (
      <GangScreen 
        onNext={handleGangSubmit}
        onBack={() => setCurrentStep(21)}
      />
    );
  }

  if (currentStep === 23) {
    return (
      <TrustScaleScreen 
        onNext={handleTrustScaleSubmit}
        onBack={() => setCurrentStep(22)}
      />
    );
  }

  if (currentStep === 24) {
    return (
      <ExperiencePreferenceScreen 
        onNext={handleExperiencePreferenceSubmit}
        onBack={() => setCurrentStep(23)}
      />
    );
  }

  if (currentStep === 25) {
    return (
      <DilemmaDecisionScreen 
        onNext={handleDilemmaDecisionSubmit}
        onBack={() => setCurrentStep(24)}
      />
    );
  }

  if (currentStep === 26) {
    return (
      <AliveWhenScreen 
        onNext={handleAliveWhenSubmit}
        onBack={() => setCurrentStep(25)}
      />
    );
  }

  if (currentStep === 27) {
    return (
      <TrySomethingNewScreen 
        onNext={handleTrySomethingNewSubmit}
        onBack={() => setCurrentStep(26)}
      />
    );
  }

  if (currentStep === 28) {
    return (
      <AdventurousScaleScreen 
        onNext={handleAdventurousScaleSubmit}
        onBack={() => setCurrentStep(27)}
      />
    );
  }

  if (currentStep === 29) {
    return (
      <RiskTakingScreen 
        onNext={handleRiskTakingSubmit}
        onBack={() => setCurrentStep(28)}
      />
    );
  }

  if (currentStep === 30) {
    return (
      <DeepConversationScreen 
        onNext={handleDeepConversationSubmit}
        onBack={() => setCurrentStep(29)}
      />
    );
  }

  if (currentStep === 31) {
    return (
      <CompetitiveGamesScreen 
        onNext={handleCompetitiveGamesSubmit}
        onBack={() => setCurrentStep(30)}
      />
    );
  }

  if (currentStep === 32) {
    return (
      <PersonalMantraScreen 
        onNext={handlePersonalMantraSubmit}
        onBack={() => setCurrentStep(31)}
        isSubmitting={isSubmitting}
        submissionError={submissionError}
      />
    );
  }

  if (currentStep === 33) {
    return <CompletionScreen />;
  }

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#c5ff00' }}>
      {/* Top left icon */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">

      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full md:mx-0 md:ml-8 lg:ml-16">
          {/* Question number indicator */}
          <div className="flex items-center mb-6 md:mb-8">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: '#5f4cdc' }} />
            <span className="text-lg md:text-xl" style={{ color: '#5f4cdc' }}>1</span>
          </div>

          {/* Main question */}
          <h1 className="typeform-main-question mb-4 md:mb-6">
            What do we call you?*
          </h1>

          {/* Subtitle */}
          <p className="typeform-subtext mb-8 md:mb-12 text-[16px]">
            Your full name please
          </p>

          {/* Input field */}
          <form onSubmit={handleNameSubmit} className="space-y-6 md:space-y-8">
            <div className="relative">
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                className="w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 md:py-4 text-lg md:text-xl focus:ring-0 focus:border-b-2"
                style={{ borderBottomColor: '#5f4cdc', color: '#5f4cdc', boxShadow: 'none', fontFamily: 'Darker Grotesque, sans-serif' }}
                autoFocus
              />
              {formData.name && (
                <div className="absolute left-0 bottom-0 h-0.5 transition-all duration-300 ease-out"
                     style={{ width: `${Math.min(formData.name.length * 8, 100)}%`, backgroundColor: '#5f4cdc' }} />
              )}
            </div>

            {/* Submit button and hint */}
            <div className="flex items-center gap-4 md:gap-6">
              <Button
                type="submit"
                disabled={!formData.name.trim()}
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