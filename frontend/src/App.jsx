import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RecommendationCard from './components/RecommendationCard';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError('Error fetching recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-200"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm">
            AI-Powered Travel Assistant
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-teal-600 mb-6 tracking-tight">
            AI-powered Tourism Recommendation System for Uganda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the best of Uganda. Tell us what you like, and we'll plan the perfect trip for you. 
            From gorilla trekking to relaxing by the lake, find your ideal destination.
          </p>
        </header>

        {/* Search Form */}
        <div className="animate-fade-in animation-delay-100">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-md flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
            <div className="relative inline-flex">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-green-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">Curating your dream Ugandan adventure...</p>
          </div>
        )}

        {/* Recommendations */}
        {!loading && recommendations.length > 0 && (
          <div className="max-w-6xl mx-auto animate-fade-in animation-delay-200">
            <div className="flex items-center justify-center mb-10">
              <div className="h-px bg-gray-300 w-16"></div>
              <h2 className="text-3xl font-bold text-gray-800 mx-6">Your Trip Plan</h2>
              <div className="h-px bg-gray-300 w-16"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                  <RecommendationCard recommendation={rec} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && recommendations.length === 0 && !error && hasSearched && (
          <div className="max-w-2xl mx-auto text-center text-gray-500 mt-12 animate-fade-in animation-delay-300">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50">
              <p className="text-lg">No trip plans found matching your criteria. Try adjusting your budget or interests.</p>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!loading && recommendations.length === 0 && !error && !hasSearched && (
          <div className="max-w-2xl mx-auto text-center text-gray-500 mt-12 animate-fade-in animation-delay-300">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50">
              <p className="text-lg">Ready to explore? Tell us about your budget, interests, and time availability above.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
