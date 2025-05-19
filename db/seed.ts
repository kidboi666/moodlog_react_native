import { queryClient } from '@/lib'
import { MoodLevel } from '@/types'
import { sqliteDb } from './sqlite'
import { journals, moods } from './sqlite/schema'

// Define some sample moods
const sampleMoods = [
  { name: 'Happy', color: '#FFD700' },
  { name: 'Sad', color: '#4682B4' },
  { name: 'Angry', color: '#FF4500' },
  { name: 'Excited', color: '#FF69B4' },
  { name: 'Calm', color: '#20B2AA' },
  { name: 'Tired', color: '#708090' },
  { name: 'Anxious', color: '#9932CC' },
  { name: 'Grateful', color: '#32CD32' },
]

// Sample content templates for journal entries
const contentTemplates = [
  'Today was a great day. I felt really {mood}.',
  'I had a challenging day today. My mood was {mood}.',
  'Spent time with friends today, which made me feel {mood}.',
  'Worked on a project today. It was {mood} experience.',
  'Took some time for self-care today. Feeling {mood}.',
  'Had a productive day at work. Feeling {mood} about my progress.',
  'Went for a walk in nature today. It was {mood}.',
  'Tried a new recipe today. The experience was {mood}.',
  'Reflected on my goals today. Feeling {mood} about my direction.',
  'Had a good conversation with a friend. Feeling {mood} after.',
]

async function createSampleMoods() {
  await sqliteDb.delete(moods)
  await sqliteDb.insert(moods).values(sampleMoods)
}

function generateJournalEntry(date: string, moodId: number, moodName: string) {
  const moodLevels = [MoodLevel.ZERO, MoodLevel.HALF, MoodLevel.FULL]
  const randomMoodLevel =
    moodLevels[Math.floor(Math.random() * moodLevels.length)]
  const randomContentTemplate =
    contentTemplates[Math.floor(Math.random() * contentTemplates.length)]
  const content = randomContentTemplate.replace(
    '{mood}',
    moodName.toLowerCase(),
  )
  const hasImage = Math.random() > 0.7
  const imageUri = hasImage
    ? JSON.stringify(['https://picsum.photos/200/300'])
    : null
  return {
    content,
    moodId,
    moodLevel: randomMoodLevel,
    imageUri,
    localDate: date,
  }
}

function generateDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function getDatesInRange(startDate: Date, endDate: Date): string[] {
  const dates: string[] = []
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    dates.push(
      generateDateString(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
      ),
    )
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

async function createSampleJournals() {
  await sqliteDb.delete(journals)
  const moodList = await sqliteDb.select().from(moods)
  const startDate = new Date('2025-01-01')
  const endDate = new Date('2025-12-30')
  const dates = getDatesInRange(startDate, endDate)
  const journalEntries = []
  for (const date of dates) {
    const entriesCount = Math.floor(Math.random() * 2)
    for (let i = 0; i < entriesCount; i++) {
      const randomMood = moodList[Math.floor(Math.random() * moodList.length)]
      journalEntries.push(
        generateJournalEntry(date, randomMood.id, randomMood.name),
      )
    }
  }
  if (journalEntries.length > 0) {
    await sqliteDb.insert(journals).values(journalEntries)
  }
}

export async function seedDatabase() {
  queryClient.clear()
  await createSampleMoods()
  await createSampleJournals()
}
