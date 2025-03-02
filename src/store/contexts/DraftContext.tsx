import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Draft, Emotion } from '@/types/entries';
import { useJournal } from '@/store/hooks/useJournal';
import { ISODateString } from '@/types/dtos/date';
import { DraftStore } from '@/types/store';
import { Nullable } from '@/types/utils';

export const DraftContext = createContext<Nullable<DraftStore>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const { addJournal } = useJournal();
  const [draft, setDraft] = useState<Draft>({});

  const handleLocalDateChange = useCallback((date: ISODateString) => {
    setDraft(prev => ({ ...prev, localDate: date }));
  }, []);

  const handleEmotionChange = useCallback((emotion: Emotion) => {
    setDraft(prev => ({ ...prev, emotion }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setDraft(prev => ({ ...prev, title }));
  }, []);

  const handleDraftSubmit = useCallback((draft: Draft) => {
    addJournal(draft);
    setDraft({});
  }, []);

  const initDraft = useCallback(() => {
    setDraft({});
  }, []);

  return (
    <DraftContext.Provider
      value={{
        draft,
        initDraft,
        onLocalDateChange: handleLocalDateChange,
        onEmotionChange: handleEmotionChange,
        onContentChange: handleContentChange,
        onTitleChange: handleTitleChange,
        onDraftSubmit: handleDraftSubmit,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
