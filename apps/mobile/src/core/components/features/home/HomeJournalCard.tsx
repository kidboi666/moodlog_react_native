import { EmptyJournal } from '@/core/components/features/journal/EmptyJournal';
import { JournalCard } from '@/core/components/features/journal/JournalCard';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import {
  ANIMATION_DELAY_MS,
  ANIMATION_DELAY_SECONDS,
} from '@/core/constants/time';
import { SelectedJournals } from '@/core/store/types/journal.types';
import { ISODateString } from '@/types/date.types';
import { Nullable } from '@/types/utill.types';
import React, { Fragment } from 'react';

interface Props {
  journals: SelectedJournals;
  onDeletePress: (id: string) => void;
  isToday: (date: Nullable<ISODateString>) => boolean;
}

export const HomeJournalCard = ({
  journals,
  onDeletePress,
  isToday,
}: Props) => {
  return Array.isArray(journals) ? (
    journals.map((journal, index) => {
      const { id, content, createdAt, mood, imageUri } = journal;
      return (
        <Fragment key={journal.id}>
          <FadeIn
            delay={ANIMATION_DELAY_MS[index % ANIMATION_DELAY_SECONDS.length]}
          >
            <JournalCard
              id={id}
              content={content}
              moodType={mood.type}
              moodLevel={mood.level}
              imageUri={imageUri}
              createdAt={createdAt}
              onDeletePress={onDeletePress}
            />
          </FadeIn>
        </Fragment>
      );
    })
  ) : (
    <FadeIn>
      <EmptyJournal isToday={isToday(journals)} />
    </FadeIn>
  );
};
