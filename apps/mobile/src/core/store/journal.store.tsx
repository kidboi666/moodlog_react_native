import { create } from 'zustand';

import { JournalService } from '@/core/services/journal.service';

import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import {
  Draft,
  JournalIndexes,
  JournalStore,
  JournalStoreState,
} from '@/types/journal.types';

const initialIndexes: JournalIndexes = {
  byMonth: {},
  byDate: {},
  byYear: {},
  byMood: {
    happy: [],
    sad: [],
    peace: [],
    angry: [],
  },
};

const initialStore: JournalStore = {
  journals: {},
  indexes: initialIndexes,
};

export const useJournal = create<JournalStoreState>((set, get) => ({
  store: initialStore,
  selectedJournals: null,
  selectedJournal: null,
  isLoading: false,
  error: null,

  selectJournal: (journalId: string) => {
    const journal = JournalService.getJournalById(
      get().store.journals,
      journalId,
    );
    set({ selectedJournal: journal });
  },

  selectJournals: (date: ISODateString | ISOMonthString | null) => {
    const journals = JournalService.getJournals(get().store, date);
    set({ selectedJournals: journals });
  },

  addJournal: async (draft: Draft) => {
    try {
      set({ isLoading: true, error: null });
      const newJournals = await JournalService.addJournal(get().store, draft);
      set({ store: newJournals });
    } catch (err) {
      console.error('Failed to save journals :', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  removeJournal: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const newStore = await JournalService.removeJournal(get().store, id);
      set({ store: newStore });
    } catch (err) {
      console.error('Failed to remove journal :', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  getCountForDate: (year: number, month: number | string, date: number) => {
    return JournalService.getCountForDate(
      get().store.indexes || initialIndexes,
      year,
      month,
      date,
    );
  },

  getCountForMonth: (year: number, month: number | MonthKey) => {
    return JournalService.getCountForMonth(
      get().store.indexes || initialIndexes,
      year,
      month,
    );
  },

  getMoodForDate: (date: ISODateString) => {
    return JournalService.getMoodForDate(get().store, date);
  },

  initJournals: async () => {
    try {
      set({ isLoading: true, error: null });
      const newStore = await JournalService.loadJournalStore();
      const safeStore = {
        journals: newStore?.journals || {},
        indexes: {
          byYear: newStore?.indexes?.byYear || {},
          byMonth: newStore?.indexes?.byMonth || {},
          byDate: newStore?.indexes?.byDate || {},
          byMood: newStore?.indexes?.byMood || {
            happy: [],
            sad: [],
            peace: [],
            angry: [],
          },
        },
      };
      set({ store: safeStore });
    } catch (err) {
      console.error('Failed to init journals :', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const initializeJournalStore = async () => {
  await useJournal.getState().initJournals();
};
