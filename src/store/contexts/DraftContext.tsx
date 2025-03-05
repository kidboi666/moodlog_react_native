import {
  createContext,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Draft, Emotion } from '@/types/entries';
import { ISODateString } from '@/types/dtos/date';
import { DraftStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { EnhancedTextInputRef } from '@/screens/write/EnhancedTextInput';

export const DraftContext = createContext<Nullable<DraftStore>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const [draft, setDraft] = useState<Draft>({});
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const enhancedInputRef = useRef<EnhancedTextInputRef>(null);

  const handleLocalDateChange = useCallback((date: ISODateString) => {
    setDraft(prev => ({ ...prev, localDate: date }));
  }, []);

  const handleEmotionChange = useCallback((emotion: Emotion) => {
    setDraft(prev => ({ ...prev, emotion }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  const handleTimeStamp = () => {
    enhancedInputRef.current?.insertCurrentTime();
  };

  const handleSelectionChange = (event: any) => {
    setSelection(event.nativeEvent.selection);
  };

  const handleImageUriChange = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        alert('사진을 추가하기 위해선 사진 접근 권한이 필요합니다.');
        return null;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled) {
        return null;
      }

      const journalImagesDir = `${FileSystem.documentDirectory}journal_images/`;
      const dirInfo = await FileSystem.getInfoAsync(journalImagesDir);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(journalImagesDir, {
          intermediates: true,
        });
      }

      const fileExt = result.assets[0].uri.split('.').pop();
      const fileName = `${new Date().toISOString().split('T')[0]}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const newFilePath = `${journalImagesDir}${fileName}`;

      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newFilePath,
      });

      console.log('Image saved successfully.', newFilePath);
      setDraft(prev => ({ ...prev, imageUri: newFilePath }));
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  };

  const initDraft = () => {
    setDraft({});
  };

  return (
    <DraftContext.Provider
      value={{
        draft,
        initDraft,
        enhancedInputRef,
        selection,
        onTimeStamp: handleTimeStamp,
        onImageUriChange: handleImageUriChange,
        onLocalDateChange: handleLocalDateChange,
        onEmotionChange: handleEmotionChange,
        onContentChange: handleContentChange,
        onSelectionChange: handleSelectionChange,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
