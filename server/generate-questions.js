import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/generate-questions', async (req, res) => {
  const { profile } = req.body;
  if (!process.env.AI_API_KEY) return res.status(500).json({ error: 'AI_API_KEY not set in env' });

  // Build a concise prompt for deterministic MCQ generation
  const skills = Array.from(new Set([...(profile.skills||[]), ...(profile.projectTechnologies||[])]))
    .map(s => String(s).trim()).filter(Boolean);

  const prompt = `You are a strict question-generator. Given these verified topics: ${JSON.stringify(skills)}\n\n` +
    `Produce up to 15 multiple-choice questions derived ONLY from those topics. Return JSON array of objects exactly in this format:\n` +
    `[ { "id": "string", "category": "string", "difficulty": "Easy|Medium|Hard", "type": "MCQ", "question": "string", "options": ["opt1","opt2","opt3","opt4"], "correctAnswer": 0, "explanation": "string" } ]\n` +
    `Return ONLY valid JSON. Ensure each MCQ has exactly 4 options and correctAnswer is the index (0-based) of the correct option.`;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.2
      })
    });

    const body = await resp.json();
    const text = body.choices?.[0]?.message?.content || '';
    // Try to parse JSON from the model output
    let questions = [];
    try { questions = JSON.parse(text); } catch (e) {
      // attempt to extract JSON substring
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        const jsonText = text.slice(start, end + 1);
        questions = JSON.parse(jsonText);
      } else throw e;
    }

    // Basic validation
    if (!Array.isArray(questions)) throw new Error('Invalid output: expected array');
    for (const q of questions) {
      if (!q.options || q.options.length !== 4) throw new Error('Each question must have 4 options');
      if (typeof q.correctAnswer !== 'number') throw new Error('correctAnswer must be numeric index');
    }

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: (err && err.message) || String(err) });
  }
});

// Serve available sample profiles
app.get('/api/samples', (req, res) => {
  try {
    const samplesDir = path.join(process.cwd(), 'server', 'samples');
    const files = fs.readdirSync(samplesDir).filter(f => f.endsWith('.json'));
    const names = files.map(f => f.replace(/\.json$/, ''));
    res.json({ samples: names });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Fetch a sample by name
app.get('/api/sample/:name', (req, res) => {
  try {
    const { name } = req.params;
    const samplePath = path.join(process.cwd(), 'server', 'samples', `${name}.json`);
    if (!fs.existsSync(samplePath)) return res.status(404).json({ error: 'sample not found' });
    const content = JSON.parse(fs.readFileSync(samplePath, 'utf8'));
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Question generation server running on http://localhost:${port}`));

// --- SERVE FRONTEND STATIC FILES FOR RENDER ---
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

import { Profile, Assessment } from './db.js';

// Route to receive and save the resume profile
app.post('/api/profiles', async (req, res) => {
  try {
    const savedProfile = await Profile.create(req.body);
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error saving profile" });
  }
});

// Route to receive and save the quiz scores
app.post('/api/assessments', async (req, res) => {
  try {
    const savedResult = await Assessment.create(req.body);
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: "Error saving assessment" });
  }
});
