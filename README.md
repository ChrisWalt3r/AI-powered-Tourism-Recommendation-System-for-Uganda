# AI-Powered Uganda Tourism Recommendation System

## Project Overview
An intelligent web application that provides personalized Ugandan tourism destination recommendations using Google Gemini AI. Users input their travel preferences in natural language and receive 2-3 relevant destination suggestions with detailed information.

**Team:** Group Eight - Computer Science Department  
**Technology:** Google Gemini API (Free Tier), React.js, Node.js/Express

---

## Features
- 🤖 AI-powered natural language query processing
- 🗺️ 10 curated Uganda tourism destinations
- 🎯 Personalized recommendations based on:
  - Budget (Low/Medium/High)
  - Activity preferences (Wildlife, Adventure, Cultural, etc.)
  - Trip duration
  - Regional preferences
- 💅 Modern, responsive UI with Tailwind CSS
- ⚡ Fast React + Vite frontend
- 🔒 Secure API key management

---

## Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Integration:** Google Generative AI SDK
- **Data Storage:** Static JSON file

---

## Project Structure
```
uganda-tourism-mvp/
├── backend/
│   ├── server.js              # Express server & AI integration
│   ├── destinations.json      # Tourism destinations data
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx
│   │   │   └── RecommendationCard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── plan.txt                   # Detailed project specification
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### 1. Clone/Navigate to Project Directory
```bash
cd "d:\BCS 2 SEM 2\AI\Tourism Recommendation"
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here
# PORT=5000

# Start the backend server
npm start
# Or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in `backend/.env` file:
   ```
   GEMINI_API_KEY=your_copied_key_here
   ```

---

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Enter your travel preferences in natural language, for example:
   - "I want to see gorillas with a high budget"
   - "Weekend trip from Kampala with low budget"
   - "Adventure activities for 3 days"
   - "Cultural experiences in Western Uganda"
3. Click "Explore" or press Enter
4. View your personalized recommendations!

---

## API Endpoints

### POST `/api/recommend`
Generate destination recommendations based on user query.

**Request Body:**
```json
{
  "query": "I have 2 days and a medium budget for wildlife viewing"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "name": "Queen Elizabeth National Park",
      "match_reason": "Perfect for a 2-day wildlife experience with medium budget...",
      "suggested_activities": ["Game Drives", "Boat Cruise", "Chimp Tracking"],
      "estimated_budget": "Medium",
      "best_time_to_visit": "June to September (dry season)"
    }
  ]
}
```

### GET `/api/health`
Health check endpoint to verify server status.

---

## Available Destinations

1. **Bwindi Impenetrable National Park** - Gorilla trekking (High budget)
2. **Sipi Falls** - Waterfalls & hiking (Medium budget)
3. **Queen Elizabeth National Park** - Wildlife safaris (Medium budget)
4. **Jinja (Source of the Nile)** - Adventure sports (Medium budget)
5. **Murchison Falls National Park** - Wildlife & waterfalls (Medium-High budget)
6. **Lake Bunyonyi** - Relaxation & culture (Low-Medium budget)
7. **Kampala City** - Urban & cultural experiences (Low-Medium budget)
8. **Mgahinga Gorilla National Park** - Gorillas & volcanoes (High budget)
9. **Kibale National Park** - Primate tracking (Medium-High budget)
10. **Ziwa Rhino Sanctuary** - Rhino tracking (Low-Medium budget)

---

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build  # Creates dist/ folder

# Backend
cd backend
npm start  # Production mode
```

---

## Testing Sample Queries

Try these queries to test the system:

1. "I want to see gorillas with a high budget"
2. "Weekend trip from Kampala with low budget"
3. "Adventure activities for 3 days"
4. "Cultural experiences in Western Uganda"
5. "Family vacation with medium budget"
6. "I have 2 days and a medium budget for wildlife viewing"
7. "Looking for adventure activities near Kampala"

---

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variable: `GEMINI_API_KEY`
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Update API URL in `App.jsx` to production backend URL

---

## Troubleshooting

### Backend Issues
- **"GEMINI_API_KEY is not defined"**: Check your `.env` file
- **Port 5000 already in use**: Change PORT in `.env` file
- **Dependencies errors**: Delete `node_modules` and run `npm install` again

### Frontend Issues
- **"Cannot connect to backend"**: Ensure backend is running on port 5000
- **Styling issues**: Run `npm install` to ensure Tailwind is installed
- **Build errors**: Check Node.js version (requires v16+)

### API Issues
- **"Failed to parse AI response"**: Gemini API may return non-JSON; check API key validity
- **Rate limiting**: Free tier has usage limits; wait and retry

---

## Future Enhancements
- User authentication and saved preferences
- Interactive map integration
- Image gallery for destinations
- User reviews and ratings
- Multi-language support
- Weather information integration
- Booking system integration

---

## License
This project is part of an academic assignment for the Computer Science Department.

---

## Contributors
**Group Eight** - BCS 2 SEM 2

---

## Support
For issues or questions, refer to the `plan.txt` file for detailed specifications.
