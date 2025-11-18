import { ReadingText } from '../ReadingText';
import { ImageSlot } from '../ImageSlot';

interface Slide1Props {
  progress: number;
}

export const Slide1 = ({ progress }: Slide1Props) => (
  <div className="max-w-5xl flex flex-col gap-8 items-center">
    <ReadingText progress={progress}>
      {['온라인 강의 완강률', '겨우 15%예요']}
    </ReadingText>

    <ImageSlot
      show={progress >= 40}
      src="/images/slide-1.jpg"
      animation="scale"
    />
  </div>
);

export const audioFile = '/audio/slide-1.mp3';
