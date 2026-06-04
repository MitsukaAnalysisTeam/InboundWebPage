-- Add sort_order column to menu table
ALTER TABLE menu ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Initialize sort_order for existing rows (ordered by id)
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn
  FROM menu
)
UPDATE menu SET sort_order = numbered.rn
FROM numbered
WHERE menu.id = numbered.id;
