import sql from '../lib/db';

async function main() {
  console.log('Running migrations...');

  await sql`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      author_id VARCHAR(255) NOT NULL,
      author_name VARCHAR(255) NOT NULL,
      scammer_name VARCHAR(255) NOT NULL,
      scammer_id VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      images TEXT[],
      status VARCHAR(50) DEFAULT 'pending',
      risk VARCHAR(50) DEFAULT 'low',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255)
    );
  `;

  console.log('Migrations completed.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error running migrations:', err);
  process.exit(1);
});