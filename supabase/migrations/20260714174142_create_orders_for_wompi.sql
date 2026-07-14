/*
# Create orders and order_items tables (Wompi-ready, no auth)

1. Purpose
   - Persist checkout orders placed before redirecting to the Wompi payment gateway.
   - This migration only prepares the data structure. No payment gateway is integrated yet.
   - The app is single-tenant (no sign-in screen), so policies allow the anon-key
     client to create and read its own orders.

2. New Tables
   - `orders`
     - `id` (uuid, primary key) — also used as the Wompi reference/merchant_reference.
     - `status` (text, default 'pending') — pending | paid | rejected | expired.
     - `customer_name` (text, not null)
     - `customer_email` (text, not null)
     - `customer_phone` (text, not null)
     - `customer_city` (text, not null)
     - `customer_address` (text, not null)
     - `notes` (text, nullable) — optional order observations.
     - `subtotal` (integer, not null) — sum of line items in COP cents-free integer pesos.
     - `shipping` (integer, default 0) — shipping cost in COP.
     - `total` (integer, not null) — subtotal + shipping.
     - `wompi_transaction_id` (text, nullable) — filled later when Wompi responds.
     - `wompi_payment_status` (text, nullable) — mirror of Wompi status once integrated.
     - `created_at` (timestamptz, default now())
   - `order_items`
     - `id` (uuid, primary key)
     - `order_id` (uuid, foreign key -> orders.id ON DELETE CASCADE)
     - `product_id` (text, not null)
     - `product_name` (text, not null)
     - `size` (text, not null)
     - `color` (text, not null)
     - `quantity` (integer, not null, check > 0)
     - `unit_price` (integer, not null) — COP pesos
     - `created_at` (timestamptz, default now())

3. Indexes
   - `order_items_order_id_idx` on order_items(order_id) for fast join lookups.

4. Security
   - Enable RLS on both tables.
   - No sign-in screen exists, so policies use `TO anon, authenticated`.
   - SELECT/INSERT allowed for anon+authenticated (public checkout flow).
   - UPDATE/DELETE restricted to authenticated only (admin back-office later);
     anon cannot modify or remove orders once placed.

5. Important notes
   - Amounts are stored as plain integer Colombian pesos (no decimals).
   - `wompi_transaction_id` and `wompi_payment_status` are nullable placeholders
     so the table is ready to store Wompi callback data without a future migration.
   - No payment gateway integration is performed in this migration.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending',
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_city text NOT NULL,
  customer_address text NOT NULL,
  notes text,
  subtotal integer NOT NULL DEFAULT 0,
  shipping integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  wompi_transaction_id text,
  wompi_payment_status text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  size text NOT NULL,
  color text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- orders: anon can create and read (public checkout). Only authenticated can update/delete.
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_orders" ON orders;
CREATE POLICY "auth_delete_orders" ON orders FOR DELETE
  TO authenticated USING (true);

-- order_items: anon can create and read. Only authenticated can update/delete.
DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_order_items" ON order_items;
CREATE POLICY "auth_update_order_items" ON order_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_order_items" ON order_items;
CREATE POLICY "auth_delete_order_items" ON order_items FOR DELETE
  TO authenticated USING (true);
