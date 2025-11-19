const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load destinations data
const destinations = require('./destinations.json');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Recommendation endpoint
app.post('/api/recommend', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Construct the system prompt
    const systemPrompt = `
You are an expert, friendly, and knowledgeable tourism assistant specialized exclusively in Uganda. Your primary goal is to provide helpful, accurate, and personalized travel recommendations to users planning a trip to Uganda.

Below is a list of tourist destinations in Uganda. Use this list as your primary source of information. Do not recommend destinations outside of this list.

${JSON.stringify(destinations, null, 2)}

---
User Query: "${query}"
---

Carefully analyze the user's query and match it to the most relevant destinations from the list based on the following criteria, in order of priority:
1.  **Interests & Activity Match:** The destination's type and key_activities must align with the user's stated interests.
2.  **Budget Compatibility:** Compare the user's stated budget to the destination's budget_range.
3.  **Regional Preference:** If the user mentions a specific region, prioritize destinations in that region.
4.  **Trip Duration:** Consider the practicality of the destination for the user's trip length.
5.  **Diversity:** Suggest the most relevant destinations (up to 6) that fit the user's criteria.

You MUST format your response as a valid JSON object. Do not include any other text, explanations, or markdown formatting.

The JSON structure must be exactly as follows:
{
  "recommendations": [
    {
      "name": "Exact destination name from the list",
      "match_reason": "A concise, 1-2 sentence explanation for why this destination was chosen, directly referencing the user's query.",
      "suggested_activities": ["Activity 1", "Activity 2"],
      "estimated_budget": "The exact 'budget_range' value from the destination data (e.g., 'Low-Medium Budget', 'High Budget').",
      "best_time_to_visit": "Specific months (e.g., 'June-Aug, Dec-Feb') or 'Year-round' if applicable. Use the 'best_time_to_visit' field from the data if available."
    }
  ]
}

If no destinations match, return: {"recommendations": []}
If the query is vague, ask for clarification in the match_reason field.
`;

    // Get Gemini model - using models/gemini-2.5-flash (latest and fastest)
    // with retry logic for 503 errors
    let result;
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
      result = await model.generateContent(systemPrompt);
    } catch (error) {
      console.log(`Primary attempt failed: ${error.message}`);
      if (error.message.includes('503') || error.message.includes('overloaded')) {
        console.log('Model overloaded. Retrying in 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Retry with the same model
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
        result = await model.generateContent(systemPrompt);
      } else {
        throw error;
      }
    }

    const response = await result.response;
    const text = response.text();

    // Clean the text to remove markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

    // Parse JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw text:', text);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
