-- =====================================================
-- Supabase Migration: Platform Stats Table
-- =====================================================
-- This table stores platform statistics like vulnerabilities found,
-- contracts audited, etc. Each stat has a unique key and numeric value.

-- Create the platform_stats table
CREATE TABLE IF NOT EXISTS public.platform_stats (
    id BIGSERIAL PRIMARY KEY,
    stat_key VARCHAR(100) NOT NULL UNIQUE,
    stat_value INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on stat_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_platform_stats_stat_key ON public.platform_stats(stat_key);

-- Enable Row Level Security (RLS)
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read (for public display)
CREATE POLICY "Allow public read access" ON public.platform_stats
    FOR SELECT
    USING (true);

-- Create a policy for authenticated users to update (admin only in production)
CREATE POLICY "Allow authenticated update" ON public.platform_stats
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON public.platform_stats
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Insert initial seed data
INSERT INTO public.platform_stats (stat_key, stat_value, description)
VALUES 
    ('vulnerabilities_found', 700, 'Total number of vulnerabilities found across all audits'),
    ('contracts_audited', 50, 'Total number of smart contracts audited')
ON CONFLICT (stat_key) DO NOTHING;

-- Grant usage to anon and authenticated roles
GRANT SELECT ON public.platform_stats TO anon;
GRANT SELECT ON public.platform_stats TO authenticated;
GRANT UPDATE, INSERT ON public.platform_stats TO authenticated;
