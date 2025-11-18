import { ReadingText } from '../ReadingText';

interface Slide7Props {
  progress: number;
}

export const Slide7 = ({ progress }: Slide7Props) => (
  <div className="max-w-5xl">
    <ReadingText progress={progress}>
      {['진짜 사람처럼', '자연스러운 AI 음성으로요']}
    </ReadingText>
  </div>
);

export const audioFile = '/audio/slide-7.mp3';
