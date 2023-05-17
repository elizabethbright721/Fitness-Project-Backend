DROP DATABASE IF EXISTS fitness_dev;
CREATE DATABASE fitness_dev;

\c fitness_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    age INT,
    fit_category TEXT,
    start_weight INT,
    goal_weight INT,
    present_weight INT
);

-- CREATE TABLE diet (
--     id INT,
--     num_meals INT,
--     cal_goals INT,
--     on_track BOOLEAN
-- )

