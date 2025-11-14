-- Enable real-time updates for poll_results table
ALTER TABLE poll_results REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE poll_results;