import { Draft } from '@/types/journal.types';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { Nullable } from '@/types/utill.types';

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SELECT_MOOD = 'SELECT_MOOD',
  JOURNAL_WRITE = 'JOURNAL_WRITE',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
}

export interface BottomSheetStore {
  isOpen: boolean;
  type: Nullable<BottomSheetType>;
  snapPoint: number[] | string[];
  props: any;

  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoint: number[] | string[],
    props?: BottomSheetProps[T],
  ) => void;
  hideBottomSheet: () => void;
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: string;
    isLoading: boolean;
    onDelete: (id: string) => Promise<void>;
    onSuccess?: () => void;
    hideBottomSheet: () => void;
  };
  [BottomSheetType.SELECT_MOOD]: {
    onPress: (mood: Mood) => void;
  };
  [BottomSheetType.JOURNAL_WRITE]: {
    moodType: MoodType;
    moodLevel: MoodLevel;
    onSubmit: (draft: Draft) => void;
    isLoading: boolean;
    isSubmitted: boolean;
  };
  [BottomSheetType.SIGN_UP]: {
    userName: string;
    goLoginPage: () => void;
  };
  [BottomSheetType.SIGN_IN]: {};
};
