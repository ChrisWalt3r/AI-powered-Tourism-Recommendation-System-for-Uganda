const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testAPI() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const testModels = [
    'models/gemini-2.5-flash',
    'models/gemini-2.5-pro',
    'models/gemini-1.5-flash',
    'models/gemini-1.5-pro',
    'models/gemini-pro'
  ];
  
  for (const modelName of testModels) {
    try {
      console.log(`\nTrying: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "test" only');
      console.log(`✅ SUCCESS with ${modelName}!`);
      console.log('Response:', result.response.text());
      return; // Stop on first success
    } catch (error) {
      console.log(`❌ Failed: ${error.message.substring(0, 100)}`);
    }
  }
  
  console.log('\n⚠️ All models failed. Check your API key.');
}

testAPI();
