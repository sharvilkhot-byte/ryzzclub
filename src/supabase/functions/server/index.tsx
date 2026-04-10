import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as XLSX from 'npm:xlsx@0.18.5'
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS configuration
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

app.use('*', logger(console.log))

// Create Supabase client for server operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

// Initialize storage bucket for Excel files
const initializeStorage = async () => {
  const bucketName = 'make-1d40cbda-excel-exports'
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        allowedMimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      })
      
      if (error) {
        console.error('Error creating storage bucket:', error)
      } else {
        console.log('Storage bucket created successfully:', bucketName)
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error)
  }
}

// Initialize storage on startup
initializeStorage()

// Function to generate Excel file with all submissions
const generateExcelFile = async () => {
  try {
    console.log('Starting Excel file generation...')
    
    // Get all submissions
    const submissions = await kv.getByPrefix('submission-')
    
    if (submissions.length === 0) {
      console.log('No submissions found, skipping Excel generation')
      return null
    }
    
    // Fetch detailed data for all submissions
    const detailedSubmissions = []
    
    for (const submissionRef of submissions) {
      const submission = await kv.get(`dating-form-${submissionRef.id}`)
      if (submission) {
        detailedSubmissions.push(submission)
      }
    }
    
    if (detailedSubmissions.length === 0) {
      console.log('No detailed submissions found, skipping Excel generation')
      return null
    }
    
    // Define column headers (same as CSV export)
    const headers = [
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
    ]
    
    // Prepare data rows
    const rows = detailedSubmissions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(submission => [
        submission.id || '',
        submission.timestamp || '',
        submission.name || '',
        submission.email || '',
        submission.phoneNumber || '',
        submission.countryCode || '',
        submission.age || '',
        submission.location || '',
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
      ])
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
    
    // Auto-size columns
    const colWidths = headers.map(header => ({ wch: Math.max(header.length, 15) }))
    ws['!cols'] = colWidths
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Dating Form Submissions')
    
    // Generate Excel file buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
    
    // Upload to Supabase Storage - using consistent filename
    const fileName = 'dating-form-responses.xlsx'
    const bucketName = 'make-1d40cbda-excel-exports'
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, excelBuffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        upsert: true
      })
    
    if (uploadError) {
      console.error('Error uploading Excel file:', uploadError)
      return null
    }
    
    console.log(`✅ Master Excel file updated successfully: ${fileName}`)
    console.log(`📊 Total submissions included: ${detailedSubmissions.length}`)
    console.log(`🔄 File contains all responses from day one to present`)
    
    return fileName
    
  } catch (error) {
    console.error('Error generating Excel file:', error)
    return null
  }
}

// Function to send data to Google Sheets
const sendToGoogleSheets = async (submissionData) => {
  try {
    // Get Google Sheets webhook URL from environment variable
    const googleSheetsWebhook = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL')
    
    if (!googleSheetsWebhook) {
      console.log('⚠️ Google Sheets webhook URL not configured, skipping Google Sheets update')
      return { success: false, reason: 'No webhook URL configured' }
    }
    
    console.log('📊 Sending data to Google Sheets...')
    
    // Send data to Google Sheets webhook
    const response = await fetch(googleSheetsWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    const result = await response.text()
    
    if (response.ok) {
      console.log('✅ Successfully sent data to Google Sheets!')
      return { success: true, response: result }
    } else {
      console.error('❌ Failed to send data to Google Sheets:', response.status, result)
      return { success: false, error: result, status: response.status }
    }
    
  } catch (error) {
    console.error('❌ Error sending data to Google Sheets:', error)
    return { success: false, error: error.message }
  }
}

// Submit dating form data
app.post('/make-server-1d40cbda/submit-form', async (c) => {
  try {
    const formData = await c.req.json()
    
    // Generate a unique ID for this submission or use existing
    const submissionId = formData.id || crypto.randomUUID()
    
    // If updating an existing record, we shouldn't overwrite the original timestamp.
    // Fetch it first to see if it exists, otherwise use current time.
    let timestamp = new Date().toISOString()
    const existingData = formData.id ? await kv.get(`dating-form-${formData.id}`) : null
    if (existingData && existingData.timestamp) {
      timestamp = existingData.timestamp;
    }
    
    // Structure the data for storage
    const submissionData = {
      id: submissionId,
      timestamp,
      name: formData.name || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      countryCode: formData.countryCode || '+91',
      age: formData.age || '',
      location: formData.location || '',
      genderIdentity: formData.genderIdentity || '',
      attraction: formData.attraction || '',
      dateAvailability: formData.dateAvailability || [],
      instagram: formData.instagram || '',
      spotify: formData.spotify || '',
      relationship: formData.relationship || '',
      dinnerBudget: formData.dinnerBudget || '',
      vibe: formData.vibe || '',
      soundtrack: formData.soundtrack || '',
      attentionRating: formData.attentionRating || '',
      dinnerOrder: formData.dinnerOrder || '',
      weekendPersona: formData.weekendPersona || '',
      goToOutfit: formData.goToOutfit || '',
      restaurantNotice: formData.restaurantNotice || '',
      friendshipIngredient: formData.friendshipIngredient || '',
      gang: formData.gang || '',
      trustScale: formData.trustScale || '',
      experiencePreference: formData.experiencePreference || '',
      dilemmaDecision: formData.dilemmaDecision || '',
      aliveWhen: formData.aliveWhen || '',
      trySomethingNew: formData.trySomethingNew || '',
      adventurousScale: formData.adventurousScale || '',
      riskTaking: formData.riskTaking || '',
      deepConversation: formData.deepConversation || '',
      competitiveGames: formData.competitiveGames || '',
      personalMantra: formData.personalMantra || '',
      continueLink: existingData ? existingData.continueLink : ''
    }
    
    // Store in KV store using the submission ID as key
    await kv.set(`dating-form-${submissionId}`, submissionData)
    
    // Also store a reference with timestamp for easy querying
    await kv.set(`submission-${timestamp}-${submissionId}`, {
      id: submissionId,
      name: formData.name,
      timestamp,
      phone: `${formData.countryCode}${formData.phoneNumber}`
    })
    
    console.log(`Form submission stored successfully with ID: ${submissionId}`)
    
    // Send to Google Sheets in parallel with Excel generation
    const [googleSheetsResult, excelResult] = await Promise.allSettled([
      sendToGoogleSheets(submissionData),
      generateExcelFile()
    ])
    
    // Log Google Sheets result
    if (googleSheetsResult.status === 'fulfilled') {
      if (googleSheetsResult.value.success) {
        console.log(`📊 Successfully updated Google Sheets with submission ${submissionId}`)
      } else {
        console.log(`⚠️ Google Sheets update skipped: ${googleSheetsResult.value.reason || googleSheetsResult.value.error}`)
      }
    } else {
      console.error('❌ Google Sheets update failed:', googleSheetsResult.reason)
    }
    
    // Log Excel result
    if (excelResult.status === 'fulfilled' && excelResult.value) {
      console.log(`🚀 Auto-updated master Excel file: ${excelResult.value}`)
      console.log(`💾 All responses now available in single Excel file`)
    } else if (excelResult.status === 'rejected') {
      console.error('Error auto-generating Excel file:', excelResult.reason)
    }
    
    return c.json({ 
      success: true, 
      submissionId,
      message: 'Form submitted successfully!',
      googleSheets: googleSheetsResult.status === 'fulfilled' ? googleSheetsResult.value : null,
      excel: excelResult.status === 'fulfilled' ? !!excelResult.value : false
    })
    
  } catch (error) {
    console.error('Error submitting form:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to submit form',
      details: error.message 
    }, 500)
  }
})

// Submit part 1 of dating form data
app.post('/make-server-1d40cbda/submit-part1', async (c) => {
  try {
    const formData = await c.req.json()
    
    const submissionId = crypto.randomUUID()
    const timestamp = new Date().toISOString()
    // Frontend should be served from somewhere. We get the origin from the request headers to construct the link.
    const origin = c.req.header('origin') || 'http://localhost:3000'
    const continueLink = `${origin}/?userId=${submissionId}`
    
    const submissionData = {
      id: submissionId,
      timestamp,
      name: formData.name || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      countryCode: formData.countryCode || '+91',
      genderIdentity: formData.genderIdentity || '',
      age: formData.age || '',
      relationship: formData.relationship || '',
      continueLink
    }
    
    await kv.set(`dating-form-${submissionId}`, submissionData)
    
    await kv.set(`submission-${timestamp}-${submissionId}`, {
      id: submissionId,
      name: formData.name,
      timestamp,
      phone: `${formData.countryCode}${formData.phoneNumber}`
    })
    
    console.log(`Part 1 form submission stored successfully with ID: ${submissionId}`)
    
    // Attempt Google Sheets output for Part 1 (Optional, but good for real-time tracking)
    sendToGoogleSheets(submissionData).catch(err => console.error("Sheets update failed for Part 1:", err))
    
    return c.json({ 
      success: true, 
      submissionId,
      continueLink,
      message: 'Part 1 submitted successfully!'
    })
    
  } catch (error) {
    console.error('Error submitting part 1:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to submit form part 1',
      details: error.message 
    }, 500)
  }
})

// Get all form submissions (for admin purposes)
app.get('/make-server-1d40cbda/submissions', async (c) => {
  try {
    // Get all submission references
    const submissions = await kv.getByPrefix('submission-')
    
    return c.json({
      success: true,
      count: submissions.length,
      submissions: submissions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    })
    
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch submissions',
      details: error.message 
    }, 500)
  }
})

// Get a specific form submission
app.get('/make-server-1d40cbda/submission/:id', async (c) => {
  try {
    const submissionId = c.req.param('id')
    const submission = await kv.get(`dating-form-${submissionId}`)
    
    if (!submission) {
      return c.json({ 
        success: false, 
        error: 'Submission not found' 
      }, 404)
    }
    
    return c.json({
      success: true,
      submission
    })
    
  } catch (error) {
    console.error('Error fetching submission:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch submission',
      details: error.message 
    }, 500)
  }
})

// Admin login endpoint
app.post('/make-server-1d40cbda/admin-login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    // Admin credentials - in production, these should be environment variables
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@typeform.com'
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || 'admin123'
    
    if (email === adminEmail && password === adminPassword) {
      console.log(`Admin login successful for: ${email}`)
      return c.json({
        success: true,
        message: 'Login successful'
      })
    } else {
      console.log(`Admin login failed for: ${email}`)
      return c.json({
        success: false,
        error: 'Invalid credentials'
      }, 401)
    }
    
  } catch (error) {
    console.error('Admin login error:', error)
    return c.json({
      success: false,
      error: 'Login failed',
      details: error.message
    }, 500)
  }
})

// Download the master Excel file
app.get('/make-server-1d40cbda/download-excel', async (c) => {
  try {
    const bucketName = 'make-1d40cbda-excel-exports'
    const fileName = 'dating-form-responses.xlsx'
    
    // Check if the master file exists
    const { data: fileExists, error: checkError } = await supabase.storage
      .from(bucketName)
      .list('', { search: fileName })
    
    if (checkError) {
      console.error('Error checking for Excel file:', checkError)
      return c.json({ 
        success: false, 
        error: 'Failed to check for Excel file' 
      }, 500)
    }
    
    if (!fileExists || fileExists.length === 0) {
      // Generate the Excel file if it doesn't exist
      console.log('Master Excel file not found, generating it now...')
      const generatedFileName = await generateExcelFile()
      
      if (!generatedFileName) {
        return c.json({ 
          success: false, 
          error: 'No submissions found to create Excel file' 
        }, 404)
      }
    }
    
    // Create signed URL for download
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 3600) // 1 hour expiry
    
    if (urlError || !signedUrl) {
      console.error('Error creating signed URL:', urlError)
      return c.json({ 
        success: false, 
        error: 'Failed to create download link' 
      }, 500)
    }
    
    return c.json({
      success: true,
      downloadUrl: signedUrl.signedUrl,
      fileName: fileName,
      message: 'Master Excel file with all responses'
    })
    
  } catch (error) {
    console.error('Error downloading Excel file:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to download Excel file',
      details: error.message 
    }, 500)
  }
})

// Manually generate Excel file (for admin use)
app.post('/make-server-1d40cbda/generate-excel', async (c) => {
  try {
    const excelFileName = await generateExcelFile()
    
    if (!excelFileName) {
      return c.json({ 
        success: false, 
        error: 'Failed to generate Excel file' 
      }, 500)
    }
    
    return c.json({
      success: true,
      fileName: excelFileName,
      message: 'Excel file generated successfully'
    })
    
  } catch (error) {
    console.error('Error manually generating Excel file:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to generate Excel file',
      details: error.message 
    }, 500)
  }
})


// Test Google Sheets integration
app.post('/make-server-1d40cbda/test-google-sheets', async (c) => {
  try {
    const testData = {
      id: 'test-google-sheets-' + Date.now(),
      timestamp: new Date().toISOString(),
      name: 'Google Sheets Test User',
      phoneNumber: '1234567890',
      countryCode: '+1',
      age: '25',
      location: 'TEST LOCATION - Google Sheets Debug',
      genderIdentity: 'Test Gender',
      attraction: 'Test Attraction',
      dateAvailability: ['Test Day'],
      instagram: '@testuser',
      spotify: 'Test Playlist',
      relationship: 'Test',
      dinnerBudget: 'Test Budget',
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
    }

    // Send to Google Sheets
    const result = await sendToGoogleSheets(testData)
    
    console.log('🧪 Google Sheets test result:', result)
    
    return c.json({
      success: true,
      message: 'Google Sheets test completed',
      testData,
      googleSheetsResult: result
    })
    
  } catch (error) {
    console.error('Error testing Google Sheets:', error)
    return c.json({
      success: false,
      error: 'Failed to test Google Sheets',
      details: error.message
    }, 500)
  }
})

// Health check endpoint
app.get('/make-server-1d40cbda/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'dating-form-api'
  })
})

Deno.serve(app.fetch)