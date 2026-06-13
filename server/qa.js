import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const samplesDir = path.join(__dirname, 'samples');
const files = fs.readdirSync(samplesDir).filter(f => f.endsWith('.json'));

(async () => {
  for (const f of files) {
    const full = path.join(samplesDir, f);
    const profile = JSON.parse(fs.readFileSync(full, 'utf8'));
    console.log(`Testing ${f} - ${profile.candidateName}`);
    try {
      const resp = await fetch('http://localhost:3001/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await resp.json();
      if (resp.ok) {
        console.log(`  -> Generated ${data.questions.length} questions`);
      } else {
        console.warn(`  -> Error: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error('  -> Request failed:', err.message || err);
    }
  }
})();
