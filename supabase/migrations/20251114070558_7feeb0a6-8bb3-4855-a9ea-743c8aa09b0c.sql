-- Create table for perspective poll data
CREATE TABLE IF NOT EXISTS public.poll_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  perspective_changed BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.poll_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (anonymous poll)
CREATE POLICY "Anyone can submit poll results" 
ON public.poll_results 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to read aggregate data
CREATE POLICY "Anyone can view poll results" 
ON public.poll_results 
FOR SELECT 
USING (true);

-- Create index for better query performance
CREATE INDEX idx_poll_results_created_at ON public.poll_results(created_at DESC);