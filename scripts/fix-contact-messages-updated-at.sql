-- Fix contact_messages table: Add updated_at column if missing
-- This fixes the error: "record \"new\" has no field \"updated_at\""
-- Run this script in your Supabase SQL Editor

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contact_messages' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.contact_messages 
    ADD COLUMN updated_at timestamp with time zone default timezone('utc', now());
    
    -- Update existing rows to have updated_at = created_at
    UPDATE public.contact_messages 
    SET updated_at = COALESCE(created_at, timezone('utc', now()))
    WHERE updated_at IS NULL;
    
    RAISE NOTICE 'Added updated_at column to contact_messages table';
  ELSE
    RAISE NOTICE 'updated_at column already exists in contact_messages table';
  END IF;
END $$;

