/*
  # Create sharks table

  1. New Tables
    - `sharks`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `total_deals` (integer, default 0)
      - `total_investment` (numeric, default 0)
      - `appearances` (integer array, default empty array)
      - `profile_image` (text, nullable)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `sharks` table
    - Add policy for public read access
    - Add policy for authenticated users to manage sharks
*/

CREATE TABLE IF NOT EXISTS sharks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  total_deals integer DEFAULT 0,
  total_investment numeric DEFAULT 0,
  appearances integer[] DEFAULT '{}',
  profile_image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sharks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on sharks"
  ON sharks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage sharks"
  ON sharks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);