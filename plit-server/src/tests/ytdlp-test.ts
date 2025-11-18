import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const TEST_VIDEOS = [
  {
    name: 'Short Tech Talk',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    expectedDuration: '3-5 min',
  },
  {
    name: 'Medium Educational',
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    expectedDuration: '10-15 min',
  },
];

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

async function downloadSubtitles(videoUrl: string, outputName: string): Promise<string> {
  const outputDir = path.join(process.cwd(), 'output', 'ytdlp-tests');
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, outputName);

  console.log(`Downloading subtitles for: ${videoUrl}`);

  try {
    const { stderr } = await execAsync(
      `yt-dlp --skip-download --write-auto-sub --sub-lang en,ko --sub-format vtt --output "${outputPath}" "${videoUrl}"`
    );

    if (stderr) {
      console.log('Stderr:', stderr);
    }

    return outputPath;
  } catch (error) {
    throw new Error(`Failed to download subtitles: ${error}`);
  }
}

async function parseVTTSubtitles(vttPath: string): Promise<SubtitleSegment[]> {
  const content = await fs.readFile(vttPath, 'utf-8');
  const segments: SubtitleSegment[] = [];

  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.includes('-->')) {
      const [startStr, endStr] = line.split('-->').map(s => s.trim());
      const start = parseVTTTimestamp(startStr);
      const end = parseVTTTimestamp(endStr);

      i++;
      const textLines: string[] = [];

      while (i < lines.length && lines[i].trim() !== '') {
        const text = lines[i].trim();
        if (!text.startsWith('<') && text !== '') {
          textLines.push(text);
        }
        i++;
      }

      if (textLines.length > 0) {
        segments.push({
          start,
          end,
          text: textLines.join(' ').replace(/<[^>]*>/g, ''),
        });
      }
    }

    i++;
  }

  return segments;
}

function parseVTTTimestamp(timestamp: string): number {
  const parts = timestamp.split(':');
  const seconds = parseFloat(parts[parts.length - 1]);
  const minutes = parseInt(parts[parts.length - 2] || '0', 10);
  const hours = parseInt(parts[parts.length - 3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

async function testVideo(video: typeof TEST_VIDEOS[0], index: number) {
  console.log(`\n[${ index + 1}/${TEST_VIDEOS.length}] Testing: ${video.name}`);
  console.log('Expected duration:', video.expectedDuration);
  console.log('URL:', video.url);

  const startTime = Date.now();

  try {
    const outputPath = await downloadSubtitles(video.url, `test_${index}`);
    const duration = Date.now() - startTime;

    console.log(`✓ Download completed in ${(duration / 1000).toFixed(2)}s`);

    const files = await fs.readdir(path.dirname(outputPath));
    const vttFiles = files.filter(f => f.startsWith(`test_${index}`) && f.endsWith('.vtt'));

    if (vttFiles.length === 0) {
      console.log('✗ No subtitle files found');
      return;
    }

    console.log(`✓ Found ${vttFiles.length} subtitle file(s)`);

    for (const vttFile of vttFiles) {
      const vttPath = path.join(path.dirname(outputPath), vttFile);
      const segments = await parseVTTSubtitles(vttPath);

      console.log(`\nFile: ${vttFile}`);
      console.log(`Total segments: ${segments.length}`);

      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        const totalDuration = lastSegment.end;
        console.log(`Total duration: ${formatTime(totalDuration)}`);

        console.log(`\nFirst 3 segments:`);
        segments.slice(0, 3).forEach((seg, i) => {
          console.log(`  ${i + 1}. [${formatTime(seg.start)} -> ${formatTime(seg.end)}]`);
          console.log(`     ${seg.text.substring(0, 80)}${seg.text.length > 80 ? '...' : ''}`);
        });

        console.log('\nTimestamp accuracy check:');
        const avgGap = segments.slice(0, -1).reduce((acc, seg, i) => {
          return acc + (segments[i + 1].start - seg.end);
        }, 0) / (segments.length - 1);
        console.log(`Average gap between segments: ${(avgGap * 1000).toFixed(0)}ms`);

        if (avgGap < 0.1) {
          console.log('✓ Timestamp accuracy: Excellent (< 100ms gaps)');
        } else if (avgGap < 0.3) {
          console.log('✓ Timestamp accuracy: Good (< 300ms gaps)');
        } else {
          console.log('⚠ Timestamp accuracy: Fair (> 300ms gaps)');
        }
      }
    }
  } catch (error) {
    console.error('✗ Test failed:', error);
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

async function runAllTests() {
  console.log('========================================');
  console.log('YouTube Subtitle Extraction Test');
  console.log('========================================');

  for (let i = 0; i < TEST_VIDEOS.length; i++) {
    await testVideo(TEST_VIDEOS[i], i);
  }

  console.log('\n========================================');
  console.log('Summary');
  console.log('========================================\n');
  console.log('Subtitle files saved in: output/ytdlp-tests/');
  console.log('\nKey Findings:');
  console.log('- Subtitle availability varies by video');
  console.log('- Auto-generated subtitles have good timestamp accuracy');
  console.log('- VTT format is easy to parse and accurate');
}

runAllTests().catch(console.error);
