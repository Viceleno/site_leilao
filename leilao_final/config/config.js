const { Pool } = require('pg');

const url_bd = "postgresql://neondb_owner:ldWIy1eHo7uQ@ep-square-scene-a500isp0.us-east-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString: url_bd,
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool;
