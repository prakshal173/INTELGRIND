-- Create suggestions table
CREATE TABLE public.suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert suggestions (public form)
CREATE POLICY "Anyone can submit suggestions"
ON public.suggestions
FOR INSERT
WITH CHECK (true);

-- Create index for sorting by date
CREATE INDEX idx_suggestions_created_at ON public.suggestions(created_at DESC);