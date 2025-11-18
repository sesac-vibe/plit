import { ReadingText } from '../ReadingText';
import { ImageSlot } from '../ImageSlot';

interface Slide5Props {
  progress: number;
}

export const Slide5 = ({ progress }: Slide5Props) => (
  <div className="max-w-5xl flex flex-col gap-8 items-center">
    <ReadingText progress={progress}>
      {['Plit은', '다르게 접근했어요']}
    </ReadingText>

    <ImageSlot
      show={progress >= 50}
      src="/images/slide-5.jpg"
      animation="fade"
      className="h-80"
    />
  </div>
);

export const audioFile = '/audio/slide-5.mp3';
