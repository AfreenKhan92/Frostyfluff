-- ============================================================
-- Frosty Fluffs — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ── 1. Profiles (extends auth.users) ────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'User',
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ── 2. Products ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category    TEXT NOT NULL CHECK (category IN ('cakes','pastries','cookies','breads','beverages','custom')),
  image       TEXT DEFAULT '',
  description TEXT NOT NULL,
  in_stock    BOOLEAN DEFAULT TRUE,
  tags        TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);


-- ── 3. Cart Items ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity    INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);


-- ── 4. Orders ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_price         DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','preparing','completed','cancelled')),
  shipping_street     TEXT DEFAULT '',
  shipping_city       TEXT DEFAULT '',
  shipping_postal_code TEXT DEFAULT '',
  shipping_phone      TEXT DEFAULT '',
  notes               TEXT DEFAULT '',
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC);


-- ── 5. Order Items (price snapshot at time of purchase) ─────
CREATE TABLE IF NOT EXISTS order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
  name        TEXT NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity >= 1)
);


-- ── 6. Custom Cakes ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS custom_cakes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flavor          TEXT NOT NULL,
  size            TEXT NOT NULL CHECK (size IN ('6-inch','8-inch','10-inch','12-inch','tiered')),
  frosting        TEXT NOT NULL,
  toppings        TEXT[] DEFAULT '{}',
  message         TEXT DEFAULT '',
  estimated_price DECIMAL(10,2) DEFAULT 0,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','confirmed','in-progress','completed','cancelled')),
  admin_notes     TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_custom_cakes_user ON custom_cakes(user_id, created_at DESC);


-- ── 7. Enable Row Level Security (optional, backend uses service key) ──
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_cakes ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (already implicit, but explicit for clarity)
CREATE POLICY "Service role full access" ON profiles    FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service role full access" ON products    FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service role full access" ON cart_items  FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service role full access" ON orders      FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service role full access" ON order_items FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service role full access" ON custom_cakes FOR ALL USING (TRUE) WITH CHECK (TRUE);
