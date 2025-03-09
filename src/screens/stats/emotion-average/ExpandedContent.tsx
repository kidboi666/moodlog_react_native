import { H3, Text } from 'tamagui';
import { useStatistics } from '@/store/hooks/useStatistics';
import { ProgressGraph } from '@/screens/stats/emotion-average/ProgressGraph';
import { EmotionType } from '@/types/enums';
import { Minimize2 } from '@tamagui/lucide-icons';
import * as S from './ExpandedContent.styled';

export const ExpandedContent = () => {
  const { emotionStats } = useStatistics();

  const { scoreBoard } = emotionStats;
  let emotionTotalScore = 0;

  Object.values(scoreBoard).forEach(scoreCount => {
    emotionTotalScore += scoreCount.score;
  });

  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.TitleBox>
          <H3>감정 분포</H3>
          <Text>지금까지 작성한 감정 분포 그래프</Text>
        </S.TitleBox>
        <S.MoodGraphBox>
          {Object.entries(scoreBoard).map(([type, countScore], i) => (
            <ProgressGraph
              key={i}
              emotionType={type as EmotionType}
              emotionScore={Math.round(
                (countScore.score / emotionTotalScore) * 100,
              )}
            />
          ))}
        </S.MoodGraphBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.YStackContainer>
    </S.ViewContainer>
  );
};
