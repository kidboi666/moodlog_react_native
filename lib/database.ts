import * as SQLite from 'expo-sqlite'

export const dbInit = async (db: SQLite.SQLiteDatabase) => {
  console.log('Creating database if needed')

  await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS moods
      (
          id         TEXT PRIMARY KEY,
          name       TEXT NOT NULL,
          color      TEXT NOT NULL,
          created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS journals
      (
          id         TEXT PRIMARY KEY,
          content    TEXT NOT NULL,
          mood_id    TEXT NOT NULL,
          mood_level TEXT NOT NULL,
          created_at TEXT NOT NULL,
          image_uri  TEXT NOT NULL,
          local_date TEXT NOT NULL,
          FOREIGN KEY (mood_id) REFERENCES moods (id)
      );

      CREATE TABLE IF NOT EXISTS journal_images
      (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          journal_id TEXT NOT NULL,
          image_uri  TEXT NOT NULL,
          FOREIGN KEY (journal_id) REFERENCES journals (id)
      );

      CREATE INDEX IF NOT EXISTS idx_journals_local_date ON journals (local_date);
      CREATE INDEX IF NOT EXISTS idx_journals_created_at ON journals (created_at);
  `)
}
