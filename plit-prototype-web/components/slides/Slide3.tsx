import { ReadingText } from '../ReadingText';
import { ImageSlot } from '../ImageSlot';

interface Slide3Props {
  progress: number;
}

export const Slide3 = ({ progress }: Slide3Props) => (
  <div className="max-w-5xl flex flex-col gap-8 items-center">
    <ImageSlot
      show={progress >= 20}
      src="/images/slide-3.jpg"
      animation="slide-down"
      className="h-48"
    />

    <ReadingText progress={progress}>
      {['바쁜데', '화면 계속 봐야하잖아요']}
    </ReadingText>
  </div>
);

export const audioFile = '/audio/slide-3.mp3';
