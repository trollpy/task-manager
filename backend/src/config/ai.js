import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export const aiConfig = {
  model: 'gpt-3.5-turbo',
  maxTokens: 1000,
  temperature: 0.7
};
