import { v4 as uuidv4 } from 'uuid'
import { MoodLevel } from '../src/types/mood.types'
import { db } from './index'
import { journals, moods } from './schema'

// Define some sample moods
const sampleMoods = [
  { id: uuidv4(), name: 'Happy', color: '#FFD700' },
  { id: uuidv4(), name: 'Sad', color: '#4682B4' },
  { id: uuidv4(), name: 'Angry', color: '#FF4500' },
  { id: uuidv4(), name: 'Excited', color: '#FF69B4' },
  { id: uuidv4(), name: 'Calm', color: '#20B2AA' },
  { id: uuidv4(), name: 'Tired', color: '#708090' },
  { id: uuidv4(), name: 'Anxious', color: '#9932CC' },
  { id: uuidv4(), name: 'Grateful', color: '#32CD32' },
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

// Function to generate a random journal entry
function generateJournalEntry(date: string, moodId: string, moodName: string) {
  const moodLevels = [MoodLevel.ZERO, MoodLevel.HALF, MoodLevel.FULL]
  const randomMoodLevel =
    moodLevels[Math.floor(Math.random() * moodLevels.length)]

  const randomContentTemplate =
    contentTemplates[Math.floor(Math.random() * contentTemplates.length)]
  const content = randomContentTemplate.replace(
    '{mood}',
    moodName.toLowerCase(),
  )

  // Random chance to have an image
  const hasImage = Math.random() > 0.7
  const imageUri = hasImage
    ? JSON.stringify(['https://picsum.photos/200/300'])
    : null

  return {
    id: uuidv4(),
    content,
    moodId,
    moodLevel: randomMoodLevel,
    imageUri,
    localDate: date,
  }
}

// Function to generate a date string in ISO format (YYYY-MM-DD)
function generateDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// Function to get all dates between start and end dates
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

// Main seeding function
export async function seedDatabase() {
  await db.delete(journals)
  await db.delete(moods)
  console.log('Starting database seeding...')

  // Insert moods
  console.log('Inserting moods...')
  await db.insert(moods).values(sampleMoods).onConflictDoNothing()

  // Get date range
  const startDate = new Date('2025-01-01')
  const endDate = new Date('2025-12-30')
  const dates = getDatesInRange(startDate, endDate)

  console.log(`Generating journal entries for ${dates.length} days...`)

  // For each date, create 0-3 journal entries
  const journalEntries = []

  for (const date of dates) {
    const entriesCount = Math.floor(Math.random() * 4) // 0-3 entries per day

    for (let i = 0; i < entriesCount; i++) {
      const randomMood =
        sampleMoods[Math.floor(Math.random() * sampleMoods.length)]
      journalEntries.push(
        generateJournalEntry(date, randomMood.id, randomMood.name),
      )
    }
  }

  // Insert journal entries
  console.log(`Inserting ${journalEntries.length} journal entries...`)
  if (journalEntries.length > 0) {
    await db.insert(journals).values(journalEntries)
  }

  console.log('Database seeding completed successfully!')
}

// Execute the seeding function
seedDatabase().catch(error => {
  console.error('Error seeding database:', error)
})
