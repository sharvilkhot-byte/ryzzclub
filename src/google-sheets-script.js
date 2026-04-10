/**
 * 🎯 DATING FORM - GOOGLE SHEETS INTEGRATION
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Save" (disk icon)
 * 5. Click "Deploy" > "New deployment"
 * 6. Set type to "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web app URL and send it to me!
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Define the expected headers in the correct order
    const expectedHeaders = [
      'Submission ID',
      'Timestamp', 
      'Full Name',
      'Email Address',
      'Phone Number',
      'Country Code',
      'Age',
      'Location',
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
    
    // Check if headers exist and are complete
    const lastRow = sheet.getLastRow();
    let needsHeaderUpdate = false;
    
    if (lastRow === 0) {
      // Sheet is empty, create all headers
      needsHeaderUpdate = true;
    } else {
      // Check if all expected headers exist
      const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      
      // Compare expected vs existing headers
      if (existingHeaders.length !== expectedHeaders.length) {
        needsHeaderUpdate = true;
      } else {
        // Check if any headers are missing or different
        for (let i = 0; i < expectedHeaders.length; i++) {
          if (existingHeaders[i] !== expectedHeaders[i]) {
            needsHeaderUpdate = true;
            break;
          }
        }
      }
    }
    
    if (needsHeaderUpdate) {
      // Clear existing headers and add complete header row
      if (lastRow > 0) {
        // Insert a new row at the top for headers if data exists
        sheet.insertRowBefore(1);
      }
      
      // Add complete headers to first row
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
      
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
      headerRange.setBackground('#5f4cdc');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, expectedHeaders.length);
    }
    
    // Prepare the new row data
    const newRow = [
      data.id || '',
      data.timestamp || '',
      data.name || '',
      data.email || '',
      data.phoneNumber || '',
      data.countryCode || '',
      data.age || '',
      data.location || '',
      data.genderIdentity || '',
      data.attraction || '',
      Array.isArray(data.dateAvailability) ? data.dateAvailability.join('; ') : (data.dateAvailability || ''),
      data.instagram || '',
      data.spotify || '',
      data.relationship || '',
      data.dinnerBudget || '',
      data.vibe || '',
      data.soundtrack || '',
      data.attentionRating || '',
      data.dinnerOrder || '',
      data.weekendPersona || '',
      data.goToOutfit || '',
      data.restaurantNotice || '',
      data.friendshipIngredient || '',
      data.gang || '',
      data.trustScale || '',
      data.experiencePreference || '',
      data.dilemmaDecision || '',
      data.aliveWhen || '',
      data.trySomethingNew || '',
      data.adventurousScale || '',
      data.riskTaking || '',
      data.deepConversation || '',
      data.competitiveGames || '',
      data.personalMantra || '',
      data.continueLink || ''
    ];
    
    // Add the new row (insert at row 2 to keep newest entries at top)
    sheet.insertRowAfter(1);
    sheet.getRange(2, 1, 1, newRow.length).setValues([newRow]);
    
    // Style the new row
    const newRowRange = sheet.getRange(2, 1, 1, newRow.length);
    newRowRange.setBackground('#f8f9ff');
    newRowRange.setBorder(true, true, true, true, false, false, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data added to Google Sheet successfully!',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing webhook:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (you can delete this after testing)
function testWebhook() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        id: 'test-123',
        timestamp: new Date().toISOString(),
        name: 'Test User',
        phoneNumber: '1234567890',
        countryCode: '+1',
        age: '25',
        location: 'Test City, Test Country',
        genderIdentity: 'Test Gender',
        attraction: 'Test Attraction',
        dateAvailability: ['Weekends', 'Evenings'],
        instagram: '@testuser',
        spotify: 'Test Playlist'
      })
    }
  };
  
  return doPost(testData);
}