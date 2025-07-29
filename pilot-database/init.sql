-- Create tables
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_items_updated_at BEFORE UPDATE
    ON items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO items (name, description, priority) VALUES
    ('Setup CI/CD Pipeline', 'Configure GitHub Actions for automated testing and deployment', 'high'),
    ('Add Authentication', 'Implement JWT-based authentication system', 'high'),
    ('Write Documentation', 'Create comprehensive API documentation', 'medium'),
    ('Performance Testing', 'Set up load testing with k6 or similar tool', 'low');

-- Create indexes
CREATE INDEX idx_items_priority ON items(priority);
CREATE INDEX idx_items_created_at ON items(created_at DESC);