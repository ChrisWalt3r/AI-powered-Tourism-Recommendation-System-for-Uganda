import React from 'react';

const RecommendationCard = ({ recommendation }) => {
  const getBudgetColor = (budget) => {
    const lowerBudget = budget.toLowerCase();
    if (lowerBudget.includes('low')) return 'bg-green-100 text-green-800';
    if (lowerBudget.includes('medium')) return 'bg-yellow-100 text-yellow-800';
    if (lowerBudget.includes('high')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800 leading-tight">
            {recommendation.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${getBudgetColor(recommendation.estimated_budget)}`}>
            {recommendation.estimated_budget}
          </span>
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-gray-700 italic leading-relaxed">"{recommendation.match_reason}"</p>
        </div>
        
        <div className="mb-6 flex-1">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Suggested Activities</h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.suggested_activities.map((activity, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-medium">Best time: <span className="text-gray-700">{recommendation.best_time_to_visit}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
