import React, { useState } from "react";
import { generateBotResponse } from "./utils/openai";
import "../index.css";

const InputForm = ({ onStoryGenerated }) => {
  const [name, setName] = useState("");
  const [appearance, setAppearance] = useState("");
  const [scenario, setScenario] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [userReply, setUserReply] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInputs = { name, appearance, scenario };
    const responsePrompt = `User: ${JSON.stringify(userInputs)}\n`;

    try {
      setIsLoading(true);
      const messages = [
        {
          role: "system",
          content: `
You are a helpful AI assistant that guides users through an interactive roleplay story.
The User will give their name, a description of their appearance, and the scenario they want to generate a story around. 
Your role is to respond to user inputs and drive the plot forward by providing vivid descriptions, character interactions, and multiple options for the user to choose from. 
Keep the tone engaging and maintain the narrative flow.
Each response should follow this structure:
1. Start with a vivid description of the scene or setting.
2. Introduce any characters besides the User present with detailed descriptions.
3. For character dialogue, use quotation marks and provide meaningful responses.
4. Italicize character actions to make them stand out.
5. Provide five (not six!) different options for the user to choose from, numbered 1 to 5. Make the 5th selection a bizarre scenario that could shake up the story.
6. Make the options diverse, including actions, dialogue, or unexpected events.
7. The user will reply with a number to select their chosen option to drive the adventure forward.
8. ONLY reference the option that the user selected.  All other options should be discarded from the history of the roleplay and never referenced. 
`,
        },
        ...conversationHistory,
        { role: "user", content: userReply },
        { role: "assistant", content: `${responsePrompt}` },
      ];

      const botResponse = await generateBotResponse(messages);
      const responseContent = botResponse.choices[0].message.content;

      setBotResponse(responseContent);

      setConversationHistory([
        ...conversationHistory,
        { role: "user", content: userReply },
        { role: "assistant", content: responseContent },
      ]);

      onStoryGenerated((prevStory) => {
        const newStory = prevStory + "\n" + responseContent;
        return newStory;
      });
    } catch (error) {
      console.error("Error generating bot response:", error);
    } finally {
      setIsLoading(false);
    }
    setUserReply("");
  };

  const handleSummarizeClick = async (e) => {
    e.preventDefault();
    const userInputs = { name, appearance, scenario };
    const responsePrompt = `This is some info about the User, and the original starting prompt for the adventure. Please only reference this for the first message exchange: ${JSON.stringify(
      userInputs
    )}\n`;

    try {
      setIsLoading(true);
      const messages = [
        {
          role: "system",
          content: `
You are a helpful AI assistant that guides users through an interactive roleplay story. The user is asking for a summary of the story so far. Do NOT include the five options in this summary like in the other messages.
`,
        },
        ...conversationHistory,
        {
          role: "user",
          content:
            "Summarize the story so far in as much detail as possible using 430 tokens. Do NOT include choices for proceeding like in our other messages.",
        },
        { role: "assistant", content: `${responsePrompt}` },
      ];

      const botResponse = await generateBotResponse(messages);
      const responseContent = botResponse.choices[0].message.content;

      setBotResponse(responseContent);

      setConversationHistory([
        ...conversationHistory,
        { role: "user", content: userReply },
        { role: "assistant", content: responseContent },
      ]);

      onStoryGenerated((prevStory) => {
        const newStory = prevStory + "\n" + responseContent;
        return newStory;
      });
    } catch (error) {
      console.error("Error generating bot response:", error);
    } finally {
      setIsLoading(false);
    }
    setUserReply("Repeat your last response before the summary was requested.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto mt-6 form-container"
    >
      <label className="form-label">
        What is your - or your character's - name?
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Brief description of appearance
        <input
          type="text"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Choose your adventure! Example - I'm going on a blind date
        <input
          type="text"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="form-input"
        />
      </label>

      {botResponse && (
        <div className="bot-response-container mt-4">
          <h2 className="bot-response-title">Generated Story -- </h2>
          {botResponse.split("\n").map((paragraph, index) => (
            <p key={index} className="bot-response-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <label className="form-label mt-4">
        Number Selection
        <input
          type="text"
          placeholder="Leave blank for first submission"
          value={userReply}
          onChange={(e) => setUserReply(e.target.value)}
          className="form-input"
        />
      </label>

      <button type="submit" disabled={isLoading} className="form-button mt-4">
        {isLoading ? <span className="loading-icon">&#9696;</span> : "Submit"}
      </button>

      <button
        type="button"
        onClick={handleSummarizeClick}
        className="form-button mt-4"
      >
        Summarize The Story So Far
      </button>
    </form>
  );
};

export default InputForm;
