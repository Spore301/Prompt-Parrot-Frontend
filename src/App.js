import React, { useState } from 'react';
import './App.css';

function App() {
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedPrompt('');

    try {
      const response = await fetch('http://localhost:3005/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, tone, topic }),
      });

      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedPrompt('Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🦜 Prompt Parrot</h1>

      <input
        type="text"
        placeholder="Category (e.g. blog, image gen)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tone (e.g. humorous, formal)"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Topic (e.g. memes, history)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Prompt'}
      </button>

      <div className="output">
        {generatedPrompt && (
          <>
            <h3>📝 Generated Prompt:</h3>
            <pre>{generatedPrompt}</pre>
          </>
        )}
      </div>
      <p>@Spore301</p>
    </div>
  );
}

export default App;
