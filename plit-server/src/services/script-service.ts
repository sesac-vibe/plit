import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ScriptChapter {
  title: string;
  startTime: number;
  endTime: number;
  segments: ScriptSegment[];
}

interface ScriptSegment {
  text: string;
  startTime: number;
  endTime: number;
}

interface ScriptVisual {
  imageUrl: string;
  triggerTime: number;
  duration: number;
}

interface ConvertedScript {
  chapters: ScriptChapter[];
  visuals: ScriptVisual[];
  totalDuration: number;
}

export class ScriptService {
  async convertScript(transcript: string, targetMinutes: number): Promise<ConvertedScript> {
    const systemPrompt = `You are an expert script writer for audio content. Convert the transcript into a listening-friendly script optimized for AI voice narration.

Requirements:
- Target duration: ${targetMinutes} minutes
- Create at least 3 chapters
- Each chapter should have multiple segments
- Use natural, conversational tone
- Remove filler words and repetitions
- Maintain key information and flow
- Add timestamps for segments (in seconds)
- Suggest visual trigger points

Output JSON format:
{
  "chapters": [
    {
      "title": "Chapter Title",
      "startTime": 0,
      "endTime": 120,
      "segments": [
        {
          "text": "Segment text here",
          "startTime": 0,
          "endTime": 15
        }
      ]
    }
  ],
  "visuals": [
    {
      "imageUrl": "frame_001.jpg",
      "triggerTime": 10,
      "duration": 15
    }
  ],
  "totalDuration": ${targetMinutes * 60}
}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Convert this transcript: ${transcript}` },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Failed to convert script');
    }

    return JSON.parse(content);
  }
}
