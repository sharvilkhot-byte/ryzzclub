import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fiajwuvkckjznecihclx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWp3dXZrY2tqem5lY2loY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjAxMTQsImV4cCI6MjA3MzU5NjExNH0.E3S7xO7yt1_JtKMlfLmubmvpDiWFgzT8ifQm_449AtA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)