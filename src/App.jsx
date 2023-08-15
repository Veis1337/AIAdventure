import React, { useState } from 'react';
import SnowfallBackground from './SnowfallBackground'; 
import InputForm from './InputForm';
import StoryComponent from './StoryComponent';
import '../index.css';

function App() {
  const [story, setStory] = useState('');

  return (
    <div>
      <SnowfallBackground />
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-semibold text-center text-[#ece3f7]">AI Adventure!</h1><br></br>
      <p className="bot-response-paragraph text-center text-xl">
      Embark on an AI-powered adventure with AI Adventure! Unleash your creativity as you collaborate with a cutting-edge AI to co-create engaging stories. 
      With a user-friendly interface and a touch of magic, AI Adventure is your gateway to an enchanting world where your imagination takes center stage. 
      Whether you're a seasoned storyteller or a curious explorer, dive into the realm of AI-driven storytelling and let your imagination run wild!
        </p>
        <p className="bot-response-paragraph text-center text-xs">Pro Tip - If you want to cheat, simply type out a new answer into the "Choose your adventure!" section...
        But nobody likes a cheater. Enjoy your adventure!</p>

      <InputForm onStoryGenerated={setStory} />
      <StoryComponent story={story} />
      </div>
    </div>
  );
}

export default App;
