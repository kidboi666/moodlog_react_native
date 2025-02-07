import * as S from './TitleInput.styled';

export const TitleInput = ({ ...props }) => {
  return (
    <S.TitleInput
      autoFocus={true}
      placeholder="제목을 입력하세요."
      {...props}
    />
  );
};
