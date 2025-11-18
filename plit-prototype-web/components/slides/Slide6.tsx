import { ReadingText } from '../ReadingText';
import { ImageSlot } from '../ImageSlot';

interface Slide6Props {
  progress: number;
}

export const Slide6 = ({ progress }: Slide6Props) => (
  <div className="max-w-5xl flex flex-col gap-8 items-center">
    <ImageSlot
      show={progress >= 15}
      src="/images/slide-6-1.jpg"
      animation="slide-up"
      className="h-56"
    />

    <ReadingText progress={progress}>
      {['듣다가', '필요할 때만 보면 돼요']}
    </ReadingText>

    <ImageSlot
      show={progress >= 60}
      src="/images/slide-6-2.gif"
      animation="fade"
      className="h-56"
    />
  </div>
);

export const audioFile = '/audio/slide-6.mp3';
