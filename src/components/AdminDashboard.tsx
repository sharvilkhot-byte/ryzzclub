import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, RefreshCw, Eye, Calendar, LogOut, Download } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  timestamp: string;
  phone: string;
}

interface DetailedSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  age: string;
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
  continueLink?: string;
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<DetailedSubmission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submissions', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        }
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submissions');
      }

      setSubmissions(result.submissions || []);
      
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionDetails = async (submissionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submission/${submissionId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        }
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submission details');
      }

      setSelectedSubmission(result.submission);
      setShowDetails(true);
      
    } catch (error) {
      console.error('Error fetching submission details:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const questionLabels = {
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Phone',
    countryCode: 'Country Code',
    age: 'Age',
    location: 'Location',
    genderIdentity: 'Gender Identity',
    attraction: 'Attraction',
    dateAvailability: 'Date Availability',
    instagram: 'Instagram',
    spotify: 'Spotify',
    relationship: 'Relationship Status',
    dinnerBudget: 'Dinner Budget',
    vibe: 'Vibe',
    soundtrack: 'Soundtrack',
    attentionRating: 'Attention Rating',
    dinnerOrder: 'Dinner Order',
    weekendPersona: 'Weekend Persona',
    goToOutfit: 'Go-to Outfit',
    restaurantNotice: 'Restaurant Notice',
    friendshipIngredient: 'Friendship Ingredient',
    gang: 'Gang',
    trustScale: 'Trust Scale',
    experiencePreference: 'Experience Preference',
    dilemmaDecision: 'Dilemma Decision',
    aliveWhen: 'Alive When',
    trySomethingNew: 'Try Something New',
    adventurousScale: 'Adventurous Scale',
    riskTaking: 'Risk Taking',
    deepConversation: 'Deep Conversation',
    competitiveGames: 'Competitive Games',
    personalMantra: 'Personal Mantra',
    continueLink: 'Continue Link (For Part 2)'
  };

  const downloadExcel = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/download-excel', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        }
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to get Excel download link');
      }

      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.fileName;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Excel file downloaded successfully:', result.fileName);
      
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      setError('Failed to download Excel file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch detailed data for all submissions
      const detailedSubmissions = [];
      
      for (const submission of submissions) {
        const response = await fetch(`https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/submission/${submission.id}`, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          detailedSubmissions.push(result.submission);
        }
      }

      if (detailedSubmissions.length === 0) {
        setError('No data to export');
        return;
      }

      // Define column headers
      const headers = [
        'Submission ID',
        'Timestamp',
        'Full Name',
        'Email Address',
        'Phone Number',
        'Country Code',
        'Age',
        'Gender Identity',
        'Attraction',
        'Date Availability',
        'Instagram Handle',
        'Spotify Playlist',
        'Relationship Status',
        'Dinner Budget',
        'Vibe as Drink',
        'Life Soundtrack',
        'Attention Rating',
        'Dinner Order',
        'Weekend Persona',
        'Go-to Outfit',
        'Restaurant Notice',
        'Friendship Ingredient',
        'Gang',
        'Trust Scale',
        'Experience Preference',
        'Dilemma Decision',
        'Alive When',
        'Try Something New',
        'Adventurous Scale',
        'Risk Taking',
        'Deep Conversation',
        'Competitive Games',
        'Personal Mantra',
        'Continue Link'
      ];

      // Convert data to CSV format
      const csvRows = [headers.join(',')];
      
      detailedSubmissions.forEach(submission => {
        const row = [
          submission.id || '',
          submission.timestamp || '',
          submission.name || '',
          submission.email || '',
          submission.phoneNumber || '',
          submission.countryCode || '',
          submission.age || '',
          submission.genderIdentity || '',
          submission.attraction || '',
          Array.isArray(submission.dateAvailability) ? submission.dateAvailability.join('; ') : (submission.dateAvailability || ''),
          submission.instagram || '',
          submission.spotify || '',
          submission.relationship || '',
          submission.dinnerBudget || '',
          submission.vibe || '',
          submission.soundtrack || '',
          submission.attentionRating || '',
          submission.dinnerOrder || '',
          submission.weekendPersona || '',
          submission.goToOutfit || '',
          submission.restaurantNotice || '',
          submission.friendshipIngredient || '',
          submission.gang || '',
          submission.trustScale || '',
          submission.experiencePreference || '',
          submission.dilemmaDecision || '',
          submission.aliveWhen || '',
          submission.trySomethingNew || '',
          submission.adventurousScale || '',
          submission.riskTaking || '',
          submission.deepConversation || '',
          submission.competitiveGames || '',
          submission.personalMantra || '',
          submission.continueLink || ''
        ].map(field => {
          // Escape commas and quotes in CSV
          const escaped = String(field).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        
        csvRows.push(row.join(','));
      });

      // Create and download the file
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `dating-form-submissions-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      console.log(`Successfully exported ${detailedSubmissions.length} submissions to CSV`);
      
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      setError('Failed to export data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const testGoogleSheets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://fiajwuvkckjznecihclx.supabase.co/functions/v1/make-server-1d40cbda/test-google-sheets', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'
        }
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to test Google Sheets');
      }

      console.log('🧪 Google Sheets test result:', result);
      
      if (result.googleSheetsResult?.success) {
        setError('✅ Google Sheets test successful! Check your Google Sheet for a new test row with location: "TEST LOCATION - Google Sheets Debug"');
      } else {
        setError(`❌ Google Sheets test failed: ${result.googleSheetsResult?.error || 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error('Error testing Google Sheets:', error);
      setError(`❌ Google Sheets test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (showDetails && selectedSubmission) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#c5ff00' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl" style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600, color: '#5f4cdc' }}>
              Submission Details
            </h1>
            <Button
              onClick={() => setShowDetails(false)}
              className="text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: '#5f4cdc' }}
            >
              Back to List
            </Button>
          </div>

          <Card className="p-6" style={{ backgroundColor: 'white', border: 'none' }}>
            <div className="grid gap-4">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <Calendar className="w-5 h-5" style={{ color: '#5f4cdc' }} />
                <span style={{ fontFamily: 'Darker Grotesque, sans-serif', color: '#5f4cdc' }}>
                  Submitted: {formatDate(selectedSubmission.timestamp)}
                </span>
              </div>

              {Object.entries(selectedSubmission)
                .filter(([key]) => key !== 'id' && key !== 'timestamp')
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                    <div className="font-medium" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
                      {questionLabels[key as keyof typeof questionLabels] || key}:
                    </div>
                    <div className="md:col-span-2" style={{ fontFamily: 'Darker Grotesque, sans-serif' }}>
                      {Array.isArray(value) ? value.join(', ') : value || 'Not provided'}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c5ff00' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl" style={{ fontFamily: 'Darker Grotesque, sans-serif', fontWeight: 600, color: '#5f4cdc' }}>
            Dating Form Submissions
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={fetchSubmissions}
              disabled={loading}
              className="text-white px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: '#5f4cdc' }}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={downloadExcel}
              disabled={loading || submissions.length === 0}
              className="text-white px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: '#5f4cdc' }}
            >
              <Download className="w-4 h-4" />
              Download Excel
            </Button>
            <Button
              onClick={exportToCSV}
              disabled={loading || submissions.length === 0}
              className="text-white px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: '#5f4cdc' }}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              onClick={testGoogleSheets}
              disabled={loading}
              className="text-white px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: '#e67e22' }}
              title="Test Google Sheets Integration"
            >
              🧪 Test Sheets
            </Button>
            {onLogout && (
              <Button
                onClick={onLogout}
                variant="outline"
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                style={{ borderColor: '#5f4cdc', color: '#5f4cdc' }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <span style={{ color: '#ef4444', fontFamily: 'Darker Grotesque, sans-serif' }}>
              {error}
            </span>
          </div>
        )}

        <div className="grid gap-4 mb-6">
          <Card className="p-4" style={{ backgroundColor: 'white', border: 'none' }}>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" style={{ color: '#5f4cdc' }} />
              <div>
                <div className="text-lg font-medium" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
                  Total Submissions
                </div>
                <div className="text-2xl font-bold" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
                  {submissions.length}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
          {submissions.length === 0 && !loading ? (
            <Card className="p-8 text-center" style={{ backgroundColor: 'white', border: 'none' }}>
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: '#5f4cdc' }} />
              <p style={{ fontFamily: 'Darker Grotesque, sans-serif', color: '#5f4cdc' }}>
                No submissions yet. Users will appear here once they complete the form.
              </p>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="p-4" style={{ backgroundColor: 'white', border: 'none' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: '#5f4cdc', fontFamily: 'Darker Grotesque, sans-serif' }}>
                      {submission.name}
                    </h3>
                    <p className="text-sm opacity-75" style={{ fontFamily: 'Darker Grotesque, sans-serif' }}>
                      {submission.phone} • {formatDate(submission.timestamp)}
                    </p>
                  </div>
                  <Button
                    onClick={() => fetchSubmissionDetails(submission.id)}
                    disabled={loading}
                    className="text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    style={{ backgroundColor: '#5f4cdc' }}
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}