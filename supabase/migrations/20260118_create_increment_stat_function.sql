-- =====================================================
-- Supabase Migration: Increment Stats Function
-- =====================================================
-- This function safely increments a stat value.
-- Run this AFTER the platform_stats table is created.

-- Function to increment a stat by a given amount
-- Using DO block to make it idempotent (won't error if function exists)
DO $$
BEGIN
    -- Check if the function doesn't exist before creating
    IF NOT EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'increment_stat' 
        AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    ) THEN
        EXECUTE '
            CREATE FUNCTION public.increment_stat(p_stat_key VARCHAR, p_amount INTEGER DEFAULT 1)
            RETURNS INTEGER AS $func$
            DECLARE
                new_value INTEGER;
            BEGIN
                UPDATE public.platform_stats 
                SET stat_value = stat_value + p_amount,
                    updated_at = NOW()
                WHERE stat_key = p_stat_key
                RETURNING stat_value INTO new_value;
                
                RETURN new_value;
            END;
            $func$ LANGUAGE plpgsql SECURITY DEFINER;
        ';
    END IF;
END $$;

-- Grant execute permission to anon (needed for public API calls)
GRANT EXECUTE ON FUNCTION public.increment_stat(VARCHAR, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_stat(VARCHAR, INTEGER) TO authenticated;
