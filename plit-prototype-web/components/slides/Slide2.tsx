import { ReadingText } from '../ReadingText';

interface Slide2Props {
  progress: number;
}

export const Slide2 = ({ progress }: Slide2Props) => (
  <div className="max-w-5xl">
    <ReadingText progress={progress}>
      {['왜 그럴까요?']}
    </ReadingText>
  </div>
);

export const audioFile = '/audio/slide-2.mp3';
