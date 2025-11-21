-- 1. DROP TABLE IF EXISTS (This ensures we can run the script multiple times without errors)
DROP TABLE IF EXISTS campaigns;

-- 2. CREATE THE CAMPAIGNS TABLE
-- Columns are based on the requirements: Name, Status, Clicks, Cost, Impressions [cite: 7, 8, 9, 10, 11]
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY, -- Unique ID for each campaign (auto-incrementing)
    name VARCHAR(255) NOT NULL, -- Campaign Name
    status VARCHAR(10) NOT NULL CHECK (status IN ('Active', 'Paused')), -- Campaign Status (only 'Active' or 'Paused' allowed)
    clicks INTEGER NOT NULL DEFAULT 0, -- Number of Clicks
    cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00, -- Cost (currency, stored with 2 decimal places)
    impressions INTEGER NOT NULL DEFAULT 0 -- Number of Impressions
);

-- 3. INSERT 10 SAMPLE ROWS OF DATA
-- We are using the sample format provided in the assignment [cite: 26, 27] and adding 8 more.
INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000), -- Sample 1 [cite: 26]
('Black Friday', 'Paused', 320, 89.50, 2500), -- Sample 2 [cite: 27]
('Q4 Holiday Push', 'Active', 450, 120.75, 4800),
('Spring Collection Launch', 'Active', 90, 22.00, 600),
('Back to School', 'Paused', 210, 55.30, 1500),
('New User Discount', 'Active', 700, 210.45, 8000),
('Local Awareness Ad', 'Paused', 15, 5.00, 200),
('Geo-Targeting Test', 'Active', 35, 12.99, 450),
('Retargeting Campaign A', 'Paused', 180, 40.00, 1100),
('Video Ad Series', 'Active', 550, 155.80, 6200);