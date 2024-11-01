require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');  // Use require instead of import for pg


// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,      
  password: process.env.DB_PASSWORD,
  host: 'localhost',          
  database: process.env.DB_NAME,   
  port: 5432,
});

module.exports = pool;
