import { ReadingText } from '../ReadingText';

interface Slide9Props {
  progress: number;
}

export const Slide9 = ({ progress }: Slide9Props) => (
  <div className="max-w-5xl">
    <ReadingText progress={progress}>
      {['어디서든', '들을 수 있어요']}
    </ReadingText>
  </div>
);

export const audioFile = '/audio/slide-9.mp3';
