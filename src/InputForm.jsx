import React, { useState } from 'react';
import { generateBotResponse } from './utils/openai';

const InputForm = ({ onStoryGenerated }) => {
  const [name, setName] = useState('');
  const [appearance, setAppearance] = useState('');
  const [scenario, setScenario] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [userReply, setUserReply] = useState(''); // User's reply
  const [conversationHistory, setConversationHistory] = useState([]); // Conversation history

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInputs = { name, appearance, scenario };
    const responsePrompt = `User: ${JSON.stringify(userInputs)}\n`;

    try {
      // Construct messages array with conversation history and user reply
      const messages = [
        { role: 'system', content: 
          'You are a helpful assistant that generates a roleplay for the user. You will create an adventure for the user based on what they have input into the Scenario form.  Introduce new characters as it pertains to the story.  When a character is introduced, include vivid descriptions including their physical appearance, clothing, and demeanor.  When the user speaks to a character, write 1 reply only in internet RP style, italicize actions, and avoid quotation marks. Use markdown. Do not ever speak for the User in these interactions.  End each response in a way so that the user can decide what their character does next, not totally open ended so that they have to take the reigns.  Write 1 reply only in internet RP style, italicize actions, and avoid quotation marks. Use markdown. Be proactive, creative, and drive the plot and conversation forward. Introduce random events to engage the user further.  Write at least 1 paragraph, up to 5.' 
        },
        ...conversationHistory, // Include conversation history
        { role: 'user', content: userReply }, // Include user's reply
        { role: 'assistant', content: `${responsePrompt}` }
      ];

      const botResponse = await generateBotResponse(messages);
      setBotResponse(botResponse.choices[0].message.content);
      onStoryGenerated(botResponse.choices[0].message.content);

      // Update conversation history with user reply and bot response
      setConversationHistory([
        ...conversationHistory,
        { role: 'user', content: userReply },
        { role: 'assistant', content: botResponse.choices[0].message.content }
      ]);
    } catch (error) {
      console.error('Error generating bot response:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Appearance:
        <input type="text" value={appearance} onChange={(e) => setAppearance(e.target.value)} />
      </label>
      <label>
        Scenario:
        <input type="text" value={scenario} onChange={(e) => setScenario(e.target.value)} />
      </label>

      {/* User reply input */}
      <label>
        What do you do next?
        <input
          type="text"
          value={userReply}
          onChange={(e) => setUserReply(e.target.value)}
        />
      </label>

      <button type="submit">Generate Story</button>
      
      {/* Display the bot response */}
      {botResponse && (
        <div>
          <h2>Generated Story:</h2>
          <p>{botResponse}</p>
        </div>
      )}
    </form>
  );
};

export default InputForm;
