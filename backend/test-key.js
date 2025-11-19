const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No');
console.log('API Key starts with:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'N/A');

async function testAPI() {
  if (!process.env.GEMINI_API_KEY) {
    console.log('\n❌ GEMINI_API_KEY not found in .env file!');
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log('\nTesting with gemini-pro...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent('Hello, respond with just "Hi"');
    console.log('✅ SUCCESS!');
    console.log('Response:', result.response.text());
  } catch (error) {
    console.log('\n❌ Error details:');
    console.log('Message:', error.message);
    console.log('Status:', error.status);
    console.log('\nThis usually means:');
    console.log('1. The API key is invalid');
    console.log('2. The API key doesn\'t have the right permissions');
    console.log('3. You need to enable the Generative Language API in Google Cloud Console');
    console.log('\nPlease verify your API key at: https://makersuite.google.com/app/apikey');
  }
}

testAPI();
