import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';

async function generateBotResponse(messages, responsePrompt) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };

  const requestData = {
    messages: messages,
    model: 'gpt-3.5-turbo',
    max_tokens: 450,
    temperature: 0.9,
    frequency_penalty: 1.0,
    n: 1,
    prompt: responsePrompt
  };

  try {
    const response = await axios.post(API_URL, requestData, { headers });
    console.log('this is response.data', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { generateBotResponse };
