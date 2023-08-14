import React, { useState } from 'react';
import InputForm from './InputForm';
import StoryComponent from './StoryComponent';

function App() {
  const [story, setStory] = useState('');

  return (
    <div>
      <h1>Interactive Story Generator</h1>
      <InputForm onStoryGenerated={setStory} />
      <StoryComponent story={story} />
    </div>
  );
}

export default App;
