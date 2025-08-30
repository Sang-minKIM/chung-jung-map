-- Add policy_number column to policies table for youth policy tracking
ALTER TABLE policies ADD COLUMN IF NOT EXISTS policy_number TEXT;

-- Create unique constraint on policy_number to prevent duplicates
ALTER TABLE policies ADD CONSTRAINT unique_policy_number UNIQUE (policy_number);

-- Create index on policy_number for better query performance
CREATE INDEX IF NOT EXISTS idx_policies_policy_number ON policies (policy_number);

-- Update existing policies to have NULL policy_number (LH policies don't have policy numbers)
-- This allows both youth policies (with policy_number) and LH policies (without) to coexist