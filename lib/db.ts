import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);

<<<<<<< HEAD
export default sql;
=======
export default sql;
>>>>>>> 518d1718c68d5a93099e158c77ee6dd02cb21d96
