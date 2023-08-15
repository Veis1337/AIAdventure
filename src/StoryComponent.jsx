import React from 'react';
import '../index.css';

const StoryComponent = ({ story }) => {
  const storyParagraphs = story.split('\n');

  return (
    <div className="story-container">
      <h2 className="bot-response-title">History --</h2>
      {storyParagraphs.map((paragraph, index) => (
        <p key={index} className="bot-response-paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default StoryComponent;
