import { ProgressGraph } from '@/core/components/features/statistics/mood-average/ProgressGraph';

import { MoodType } from '@/types/mood.types';
import { ScoreBoard } from '@/types/statistic.types';
import { Minimize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import * as S from 'src/core/components/features/statistics/mood-average/ExpandedContent.styled';
import { H3, Text } from 'tamagui';

interface Props {
  scoreBoard: ScoreBoard;
}

export const ExpandedContent = ({ scoreBoard }: Props) => {
  const { t } = useTranslation();

  let moodTotalScore = 0;

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount.score;
  });

  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.TitleBox>
          <H3>{t('statistics.mood.title')}</H3>
          <Text>{t('statistics.mood.description')}</Text>
        </S.TitleBox>
        <S.MoodGraphBox>
          {Object.entries(scoreBoard).map(([type, countScore], i) => (
            <ProgressGraph
              key={i}
              moodType={type as MoodType}
              moodScore={Math.round((countScore.score / moodTotalScore) * 100)}
            />
          ))}
        </S.MoodGraphBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.YStackContainer>
    </S.ViewContainer>
  );
};
