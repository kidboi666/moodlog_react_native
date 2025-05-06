import { Mood, Moods, Nullable } from '@/shared/types'
import { SQLiteDatabase } from 'expo-sqlite'

export class MoodService {
  private db: SQLiteDatabase

  constructor(db: SQLiteDatabase) {
    this.db = db
  }

  async addMood(newMood: Mood) {
    const mood = await this.getMoodById(newMood.id)

    if (mood) {
      throw new Error('Mood already exists')
    }

    await this.db.runAsync(
      'INSERT INTO moods (id, name, color, created_at) VALUES (?, ?, ?, ?)',
      [newMood.id, newMood.name, newMood.color, newMood.createdAt],
    )
  }

  async getMoodById(id: string): Promise<Nullable<Mood>> {
    return await this.db.getFirstAsync('SELECT * FROM moods WHERE id = ?', [id])
  }

  async getMoods(): Promise<Nullable<Mood[]>> {
    return await this.db.getAllAsync('SELECT * FROM moods')
  }

  static updateMood(moods: Moods, newMood: Mood): Moods {
    moods[newMood.id] = newMood
    return moods
  }

  static removeMood(moods: Moods, moodId: string): Moods {
    const newMoods = { ...moods }
    delete newMoods[moodId]
    return newMoods
  }
}
