import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class TTSService {
  async generateSpeech(text: string, voice: string = 'alloy'): Promise<Buffer> {
    const mp3 = await client.audio.speech.create({
      model: 'tts-1-hd',
      voice: voice as any,
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  }

  async generateChapterAudio(segments: Array<{ text: string }>, voice: string = 'alloy'): Promise<Buffer> {
    const fullText = segments.map(s => s.text).join(' ');
    return this.generateSpeech(fullText, voice);
  }
}
