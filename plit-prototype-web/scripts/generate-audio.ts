import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const slides = [
  {
    id: 1,
    script: '온라인 강의 완강률, 겨우 15%예요',
  },
  {
    id: 2,
    script: '왜 그럴까요?',
  },
  {
    id: 3,
    script: '바쁜데, 화면 계속 봐야하잖아요',
  },
  {
    id: 4,
    script: '멀티태스킹? 당연히 안되고요',
  },
  {
    id: 5,
    script: 'Plit은, 다르게 접근했어요',
  },
  {
    id: 6,
    script: '듣다가, 필요할 때만 보면 돼요',
  },
  {
    id: 7,
    script: '진짜 사람처럼, 자연스러운 AI 음성으로요',
  },
  {
    id: 8,
    script: '운전하면서, 운동하면서',
  },
  {
    id: 9,
    script: '어디서든, 들을 수 있어요',
  },
];

async function generateAudio() {
  const audioDir = path.join(process.cwd(), 'public', 'audio');

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  for (const slide of slides) {
    console.log(`Generating audio for slide ${slide.id}...`);

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'onyx',
      input: slide.script,
      speed: 0.9,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const outputPath = path.join(audioDir, `slide-${slide.id}.mp3`);

    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Slide ${slide.id} audio saved`);
  }

  console.log('\n🎉 All audio files generated successfully!');
}

generateAudio().catch(console.error);
