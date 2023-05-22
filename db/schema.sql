DROP DATABASE IF EXISTS fitness_dev;
CREATE DATABASE fitness_dev;

\c fitness_dev;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    rating TEXT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    cost DECIMAL,
    category TEXT,
    benefit TEXT,
    benefit_two TEXT,
    benefit_three TEXT,
    is_popular BOOLEAN
);

-- CREATE TABLE ingredients (
--     id INT,
--     name TEXT,
--     ingred_1 TEXT,
--     ingred_2 TEXT,
-- )

