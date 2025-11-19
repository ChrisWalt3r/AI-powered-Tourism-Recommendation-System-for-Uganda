import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "I have 2 days and a medium budget for wildlife viewing",
    "Looking for adventure activities near Kampala",
    "Family-friendly destinations with low budget",
    "Cultural experiences in Western Uganda for 5 days"
  ];

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What kind of trip do you want? (e.g., 'wildlife safari on a budget')"
            className="w-full pl-12 pr-36 py-4 text-lg text-gray-700 bg-transparent border-none rounded-xl focus:ring-0 placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-2 px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Planning...
              </span>
            ) : 'Explore'}
          </button>
        </form>
      </div>

      {/* Example Queries */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Try asking about:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              disabled={loading}
              className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm border border-green-100 text-green-800 rounded-full hover:bg-green-50 hover:border-green-200 hover:shadow-md transition-all duration-200 disabled:opacity-50 transform hover:-translate-y-0.5"
            >
              ✨ {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
