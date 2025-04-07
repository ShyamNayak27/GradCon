const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        google_id TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        batch TEXT,
        year_of_study TEXT,
        course TEXT,
        enrollment_number TEXT,
        college_email TEXT,
        group_number TEXT,
        hostel_status TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

module.exports = { pool, initDb };