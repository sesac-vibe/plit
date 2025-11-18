import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'] as const;
const TEST_TEXT_KR = '안녕하세요. 저는 플릿의 AI 음성 내레이터입니다. 오늘은 인공지능과 음성 기술의 발전에 대해 이야기해보겠습니다.';
const TEST_TEXT_EN = 'Hello, I am Plit\'s AI voice narrator. Today, let\'s talk about the advancement of artificial intelligence and voice technology.';

interface VoiceTestResult {
  voice: string;
  model: string;
  duration: number;
  fileSize: number;
  filePath: string;
}

async function testTTSVoice(
  voice: typeof VOICES[number],
  text: string,
  language: 'kr' | 'en',
  model: 'tts-1' | 'tts-1-hd'
): Promise<VoiceTestResult> {
  const startTime = Date.now();

  console.log(`Testing ${voice} (${model}, ${language})...`);

  const mp3 = await client.audio.speech.create({
    model,
    voice,
    input: text,
    response_format: 'mp3',
  });

  const outputDir = path.join(process.cwd(), 'output', 'tts-tests');
  await fs.mkdir(outputDir, { recursive: true });

  const fileName = `${voice}_${model}_${language}.mp3`;
  const filePath = path.join(outputDir, fileName);

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const duration = Date.now() - startTime;
  const stats = await fs.stat(filePath);

  return {
    voice,
    model,
    duration,
    fileSize: stats.size,
    filePath,
  };
}

async function runAllTests() {
  console.log('========================================');
  console.log('OpenAI TTS Voice Quality Test');
  console.log('========================================\n');

  const results: VoiceTestResult[] = [];

  console.log('Testing tts-1-hd (Korean)...\n');
  for (const voice of VOICES) {
    const result = await testTTSVoice(voice, TEST_TEXT_KR, 'kr', 'tts-1-hd');
    results.push(result);
    console.log(`✓ ${voice}: ${result.duration}ms, ${(result.fileSize / 1024).toFixed(2)}KB`);
  }

  console.log('\nTesting tts-1 (Korean)...\n');
  for (const voice of VOICES) {
    const result = await testTTSVoice(voice, TEST_TEXT_KR, 'kr', 'tts-1');
    results.push(result);
    console.log(`✓ ${voice}: ${result.duration}ms, ${(result.fileSize / 1024).toFixed(2)}KB`);
  }

  console.log('\nTesting tts-1-hd (English)...\n');
  for (const voice of VOICES) {
    const result = await testTTSVoice(voice, TEST_TEXT_EN, 'en', 'tts-1-hd');
    results.push(result);
    console.log(`✓ ${voice}: ${result.duration}ms, ${(result.fileSize / 1024).toFixed(2)}KB`);
  }

  console.log('\n========================================');
  console.log('Summary');
  console.log('========================================\n');

  console.log('All audio files generated in: output/tts-tests/');
  console.log('\nListen to each voice and choose the best one for:');
  console.log('1. Natural Korean pronunciation');
  console.log('2. Human-like tone and emotion');
  console.log('3. Clear articulation');
  console.log('\nAverage generation time (HD): ~2-3 seconds per request');
  console.log('File size (HD): ~15-25KB for this test text');
}

runAllTests().catch(console.error);
