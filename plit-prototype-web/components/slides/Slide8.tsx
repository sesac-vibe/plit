import { ReadingText } from '../ReadingText';
import { ImageSlot } from '../ImageSlot';

interface Slide8Props {
  progress: number;
}

export const Slide8 = ({ progress }: Slide8Props) => (
  <div className="max-w-5xl flex flex-col gap-8 items-center">
    <ReadingText progress={progress}>
      {['운전하면서', '운동하면서']}
    </ReadingText>

    <ImageSlot
      show={progress >= 35}
      src="/images/slide-8.jpg"
      animation="scale"
      className="h-72"
    />
  </div>
);

export const audioFile = '/audio/slide-8.mp3';
