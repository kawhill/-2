-- Supabase Database Setup Script
-- This script can be safely executed multiple times

-- Create user_data_sets table
CREATE TABLE IF NOT EXISTS user_data_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  region_name TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_data_points table
CREATE TABLE IF NOT EXISTS user_data_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_set_id UUID REFERENCES user_data_sets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  altitude DOUBLE PRECISION,
  crop_type TEXT,
  planting_time TEXT,
  evapotranspiration DOUBLE PRECISION,
  soil_type TEXT,
  notes TEXT,
  tags TEXT[],
  custom_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_data_points_data_set_id 
  ON user_data_points(data_set_id);
  
CREATE INDEX IF NOT EXISTS idx_data_sets_user_id 
  ON user_data_sets(user_id);
  
CREATE INDEX IF NOT EXISTS idx_data_points_location 
  ON user_data_points(latitude, longitude);

-- Enable Row Level Security
ALTER TABLE user_data_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data_points ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for user_data_sets
DROP POLICY IF EXISTS "Users can view own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can insert own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can update own data sets" ON user_data_sets;
DROP POLICY IF EXISTS "Users can delete own data sets" ON user_data_sets;

-- Create RLS policies for user_data_sets
CREATE POLICY "Users can view own data sets"
  ON user_data_sets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data sets"
  ON user_data_sets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data sets"
  ON user_data_sets FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own data sets"
  ON user_data_sets FOR DELETE
  USING (auth.uid() = user_id);

-- Drop existing policies for user_data_points
DROP POLICY IF EXISTS "Users can view own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can insert own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can update own data points" ON user_data_points;
DROP POLICY IF EXISTS "Users can delete own data points" ON user_data_points;

-- Create RLS policies for user_data_points
CREATE POLICY "Users can view own data points"
  ON user_data_points FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

CREATE POLICY "Users can insert own data points"
  ON user_data_points FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

CREATE POLICY "Users can update own data points"
  ON user_data_points FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

CREATE POLICY "Users can delete own data points"
  ON user_data_points FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_data_sets 
      WHERE id = data_set_id
    )
  );

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_user_data_sets_updated_at ON user_data_sets;
DROP TRIGGER IF EXISTS update_user_data_points_updated_at ON user_data_points;

-- Create triggers
CREATE TRIGGER update_user_data_sets_updated_at
  BEFORE UPDATE ON user_data_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_data_points_updated_at
  BEFORE UPDATE ON user_data_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
