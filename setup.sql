-- setup.sql - Database Setup Commands for Supabase SQL Editor
-- This script initializes the database tables, inserts initial mock data,
-- and configures the Row-Level Security (RLS) policies for prototype testing.

-- ==========================================================================
-- 1. Create Tables
-- ==========================================================================

-- A. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  properties_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- B. Inspirations Table
CREATE TABLE IF NOT EXISTS inspirations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- C. Hotels / Properties Table
CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  location TEXT,
  price_per_night NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ==========================================================================
-- 2. Insert Seed Data
-- ==========================================================================

-- Seed Destinations
INSERT INTO destinations (id, name, properties_count, image_url)
VALUES 
  ('dest-1', 'Australia', 2245, 'assets/dest-australia.png'),
  ('dest-2', 'Japan', 1278, 'assets/dest-japan.png'),
  ('dest-3', 'New Zealand', 480, 'assets/dest-newzealand.png'),
  ('dest-4', 'Greece', 320, 'assets/dest-greece.png')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, properties_count = EXCLUDED.properties_count, image_url = EXCLUDED.image_url;

-- Seed Inspirations
INSERT INTO inspirations (id, title, description, image_url)
VALUES
  ('insp-1', 'Sydney''s 10 most fashionable 5 star hotels', 'Browse the fastest growing tourism sector in the heart of Australia''s vibrant coastal capital...', 'assets/insp-sydney.png'),
  ('insp-2', 'Top cities for Vegan Travellers', 'Top sites where you do not have to worry about being a vegan. Our pocket guide is here...', 'assets/insp-vegan.png'),
  ('insp-3', 'World''s top destinations during and post covid timeline', 'Pandemic safe travel, road trips and destinations offering high safety standards and clean air...', 'assets/insp-world.png')
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title, description = EXCLUDED.description, image_url = EXCLUDED.image_url;

-- Seed Hotels
INSERT INTO hotels (id, name, location, price_per_night, rating, reviews_count, image_url)
VALUES
  ('hotel-1', 'Lakeside Resort & Cabins', 'Queenstown, New Zealand', 180, 4.8, 124, 'assets/hotel-1.png'),
  ('hotel-2', 'Chiba Onsen & Spa', 'Tokyo, Japan', 240, 4.9, 89, 'assets/hotel-2.png'),
  ('hotel-3', 'Santorini Heights Cave Suites', 'Imerovigli, Greece', 320, 4.7, 215, 'assets/hotel-3.png'),
  ('hotel-4', 'The Darling Hotel & Suites', 'Sydney, Australia', 290, 4.9, 310, 'assets/hotel-1.png')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, location = EXCLUDED.location, price_per_night = EXCLUDED.price_per_night, rating = EXCLUDED.rating, reviews_count = EXCLUDED.reviews_count, image_url = EXCLUDED.image_url;


-- ==========================================================================
-- 3. Row-Level Security (RLS) Configuration
-- ==========================================================================
-- To perform CRUD operations directly from client-side JS using the anon key,
-- we must configure policies that permit these actions.
-- WARNING: For production environments, restrict write/delete policies to authenticated users.

-- Enable RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspirations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

-- A. Destinations Policies
CREATE POLICY "Allow public read destinations" 
  ON destinations FOR SELECT USING (true);

-- B. Inspirations Policies
CREATE POLICY "Allow public read inspirations" 
  ON inspirations FOR SELECT USING (true);

-- C. Hotels Policies
CREATE POLICY "Allow public read hotels" 
  ON hotels FOR SELECT USING (true);

CREATE POLICY "Allow public insert hotels" 
  ON hotels FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update hotels" 
  ON hotels FOR UPDATE USING (true);

CREATE POLICY "Allow public delete hotels" 
  ON hotels FOR DELETE USING (true);
