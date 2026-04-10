// This is a temporary script to help update colors across all screen components
const fs = require('fs');
const path = require('path');

const componentsDir = './components';
const screenFiles = [
  'PhoneNumberScreen.tsx',
  'AgeScreen.tsx', 
  'InstagramScreen.tsx',
  'SpotifyScreen.tsx',
  'RelationshipScreen.tsx',
  'DinnerBudgetScreen.tsx',
  'VibeScreen.tsx',
  'SoundtrackScreen.tsx',
  'AttentionRatingScreen.tsx',
  'DinnerOrderScreen.tsx',
  'WeekendPersonaScreen.tsx',
  'GoToOutfitScreen.tsx',
  'RestaurantNoticeScreen.tsx',
  'FriendshipIngredientScreen.tsx',
  'GangScreen.tsx',
  'TrustScaleScreen.tsx',
  'ExperiencePreferenceScreen.tsx',
  'DilemmaDecisionScreen.tsx',
  'AliveWhenScreen.tsx',
  'TrySomethingNewScreen.tsx',
  'AdventurousScaleScreen.tsx',
  'RiskTakingScreen.tsx',
  'DeepConversationScreen.tsx'
];

screenFiles.forEach(filename => {
  const filePath = path.join(componentsDir, filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace common blue classes with the new purple color
    content = content.replace(/bg-blue-600/g, 'bg-[#5f4cdc]');
    content = content.replace(/text-blue-600/g, 'text-[#5f4cdc]');
    content = content.replace(/border-blue-600/g, 'border-[#5f4cdc]');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#4a3bb8]');
    content = content.replace(/focus:border-blue-600/g, 'focus:border-[#5f4cdc]');
    content = content.replace(/text-blue-600\/60/g, 'text-[#5f4cdc]/60');
    content = content.replace(/text-blue-600\/70/g, 'text-[#5f4cdc]/70');
    content = content.replace(/text-blue-600\/80/g, 'text-[#5f4cdc]/80');
    content = content.replace(/hover:bg-blue-600\/10/g, 'hover:bg-[#5f4cdc]/10');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filename}`);
  }
});

console.log('Color update complete!');