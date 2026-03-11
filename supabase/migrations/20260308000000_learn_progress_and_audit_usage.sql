-- =====================================================
-- Learn Progress (for HexiLearn tracking & future certificates)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.learn_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    article_slug VARCHAR(255) NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, article_slug)
);

CREATE INDEX IF NOT EXISTS idx_learn_progress_user_id ON public.learn_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_learn_progress_article ON public.learn_progress(article_slug);

ALTER TABLE public.learn_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress" ON public.learn_progress
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learn_progress TO authenticated;

-- =====================================================
-- Ensure audit_usage has user_id for logged-in users
-- (Add column if table exists - safe to run)
-- =====================================================

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'audit_usage') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'audit_usage' AND column_name = 'user_id') THEN
            ALTER TABLE public.audit_usage ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
            CREATE INDEX IF NOT EXISTS idx_audit_usage_user_id ON public.audit_usage(user_id);
        END IF;
    END IF;
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;
