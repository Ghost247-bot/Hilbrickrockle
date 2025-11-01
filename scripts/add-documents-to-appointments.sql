-- Migration: Add documents column to appointments table
-- This allows storing document metadata for files uploaded during appointment booking
-- Run this script in your Supabase SQL Editor

-- Add documents column to store file metadata as JSONB
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'appointments' 
    AND column_name = 'documents'
  ) THEN
    ALTER TABLE public.appointments 
    ADD COLUMN documents jsonb DEFAULT '[]'::jsonb;
    
    -- Add comment to document the column
    COMMENT ON COLUMN public.appointments.documents IS 'Array of document metadata objects with filename, path, type, size, and uploaded_at';
    
    RAISE NOTICE 'Added documents column to appointments table';
  ELSE
    RAISE NOTICE 'documents column already exists in appointments table';
  END IF;
END $$;

-- Create index on documents column for faster queries (using GIN index for JSONB)
CREATE INDEX IF NOT EXISTS idx_appointments_documents ON public.appointments USING GIN (documents);

-- Add helpful comment
COMMENT ON INDEX idx_appointments_documents IS 'GIN index for efficient JSONB queries on documents';

