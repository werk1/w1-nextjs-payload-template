import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import { sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    INSERT INTO users (
      email,
      hash,
      salt,
      created_at,
      updated_at
    ) VALUES (
      'admin@example.com',
      'your_hashed_password', -- You'll need to generate this properly
      'your_salt',           -- You'll need to generate this properly
      datetime('now'),
      datetime('now')
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    DELETE FROM users WHERE email = 'admin@example.com';
  `)
} 