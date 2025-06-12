# Database Seeding

This directory contains the database schema and seeding scripts for the Moodlog application.

## Schema

The database schema is defined in `index.ts`. It includes the following tables:

- `journals`: Stores journal entries with mood information
- `moods`: Stores mood definitions

## Seeding

The `seed.ts` script generates sample data for testing and development purposes. It creates:

1. A set of predefined moods with different colors
2. Random journal entries for the period from April 1, 2025, to May 30, 2025

### Running the Seed Script

To run the seeding script, use the following command:

```bash
npm run seed
```

or if you're using Yarn:

```bash
yarn seed
```

This will:
1. Insert sample moods into the database
2. Generate random journal entries for each day in the specified date range
3. Insert the generated journal entries into the database

### Customizing the Seed Data

If you want to customize the seed data, you can modify the following in `seed.ts`:

- `sampleMoods`: The list of moods to create
- `contentTemplates`: The templates for journal entry content
- `startDate` and `endDate`: The date range for which to generate journal entries
- The logic in `generateJournalEntry` to change how entries are generated

## Database Connection

The database connection is set up in `index.ts` using Drizzle ORM with Expo SQLite.
