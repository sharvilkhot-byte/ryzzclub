import { useState } from 'react';
import { Button } from './ui/button';

export function GoogleSheetsDebugger() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testGoogleSheets = async () => {
    setLoading(true);
    try {
      const testData = {
        id: 'test-debug-' + Date.now(),
        timestamp: new Date().toISOString(),
        name: 'Debug Test User',
        phoneNumber: '1234567890',
        countryCode: '+1',
        age: '25',
        location: 'Debug City, Test Country', // This should appear in Google Sheets
        genderIdentity: 'Test Gender',
        attraction: 'Test Attraction',
        dateAvailability: ['Weekends'],
        instagram: '@debugtest',
        spotify: 'Debug Playlist',
        relationship: 'Test',
        dinnerBudget: '1000-1500',
        vibe: 'Test Vibe',
        soundtrack: 'Test Song',
        attentionRating: '5',
        dinnerOrder: 'Test Order',
        weekendPersona: 'Test Persona',
        goToOutfit: 'Test Outfit',
        restaurantNotice: 'Test Notice',
        friendshipIngredient: 'Test Ingredient',
        gang: 'Test Gang',
        trustScale: '5',
        experiencePreference: 'Test Experience',
        dilemmaDecision: 'Test Decision',
        aliveWhen: 'Test Alive',
        trySomethingNew: 'Test Try',
        adventurousScale: '5',
        riskTaking: 'Test Risk',
        deepConversation: '5',
        competitiveGames: '5',
        personalMantra: 'Test Mantra'
      };

      // Get webhook URL from environment (same as server uses)
      const webhookUrl = 'https://script.google.com/macros/s/AKfycbwVAunlJi5-9VDpNHEhKwkgmXKjbwMCSSu3_OuF-0IwF0k1c-_7fKY2-SBNmRDKyI-HcA/exec';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const result = await response.text();
      
      if (response.ok) {
        setResponse(`✅ SUCCESS!\n\nResponse: ${result}\n\nCheck your Google Sheet for a new row with location: "Debug City, Test Country"`);
      } else {
        setResponse(`❌ FAILED!\n\nStatus: ${response.status}\nResponse: ${result}`);
      }
    } catch (error) {
      setResponse(`❌ ERROR!\n\n${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Google Sheets Integration Test</h2>
      
      <Button 
        onClick={testGoogleSheets}
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testing...' : 'Test Google Sheets Webhook'}
      </Button>
      
      {response && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Test Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>What this test does:</strong></p>
        <ul className="list-disc list-inside mt-2">
          <li>Sends test data directly to your Google Sheets webhook</li>
          <li>Includes location data: "Debug City, Test Country"</li>
          <li>Shows the exact response from Google Sheets</li>
          <li>Helps identify if the issue is with the webhook or deployment</li>
        </ul>
      </div>
    </div>
  );
}