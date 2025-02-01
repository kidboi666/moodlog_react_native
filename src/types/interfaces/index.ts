import { IJournal } from '@/types/entries';

export interface DiaryStore {
  journals: IJournal[];
  addJournal: (journal: IJournal) => void;
  removeJournal: (id: string) => void;
}
