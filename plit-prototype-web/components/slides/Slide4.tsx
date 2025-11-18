import { ReadingText } from '../ReadingText';

interface Slide4Props {
  progress: number;
}

export const Slide4 = ({ progress }: Slide4Props) => (
  <div className="max-w-5xl">
    <ReadingText progress={progress}>
      {['멀티태스킹?', '당연히 안되고요']}
    </ReadingText>
  </div>
);

export const audioFile = '/audio/slide-4.mp3';
