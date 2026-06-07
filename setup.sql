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
  ('dest-1', 'Austràlia', 2245, 'assets/dest-australia.png'),
  ('dest-2', 'Japó', 1278, 'assets/dest-japan.png'),
  ('dest-3', 'Nova Zelanda', 480, 'assets/dest-newzealand.png'),
  ('dest-4', 'Grècia', 320, 'assets/dest-greece.png')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, properties_count = EXCLUDED.properties_count, image_url = EXCLUDED.image_url;

-- Seed Inspirations
INSERT INTO inspirations (id, title, description, image_url)
VALUES
  ('insp-1', 'Els 10 hotels de 5 estrelles més de moda a Sydney', 'Descobreix el sector turístic amb més creixement al cor de la vibrant capital costanera d''Austràlia...', 'assets/insp-sydney.png'),
  ('insp-2', 'Les millors ciutats per a viatgers vegans', 'Els millors llocs on no t''has de preocupar per ser vegà. La nostra guia de butxaca és aquí...', 'assets/insp-vegan.png'),
  ('insp-3', 'Les principals destinacions del món durant i després de la COVID-19', 'Viatges assegurats contra la pandèmia, viatges per carretera i destinacions que ofereixen alts estàndards de seguretat i aire pur...', 'assets/insp-world.png')
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title, description = EXCLUDED.description, image_url = EXCLUDED.image_url;

-- Seed Hotels
INSERT INTO hotels (id, name, location, price_per_night, rating, reviews_count, image_url)
VALUES
  ('hotel-1', 'Lakeside Resort & Cabins', 'Queenstown, Nova Zelanda', 180, 4.8, 124, 'assets/hotel-1.png'),
  ('hotel-2', 'Chiba Onsen & Spa', 'Tòquio, Japó', 240, 4.9, 89, 'assets/hotel-2.png'),
  ('hotel-3', 'Santorini Heights Cave Suites', 'Imerovigli, Grècia', 320, 4.7, 215, 'assets/hotel-3.png'),
  ('hotel-4', 'The Darling Hotel & Suites', 'Sydney, Austràlia', 290, 4.9, 310, 'assets/hotel-1.png')
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
