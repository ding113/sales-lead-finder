
export const searchSuggestions = ['Leading', 'of', 'provider', 'Tech', 'Consumer', 'Future', 'Luxury', 'Technology', 'Eco-friendly', 'Advanced', 'Energy', 'Food', 'Fashion', 'Innovation', 'Solutions', 'Global', 'Smart', 'Robotics', 'AI', 'Sustainability', 'Green', 'Medical', 'Technology', 'Consumer', 'Smart', 'Sustainability', 'Luxury', 'Medical', 'Fashion', 'Advanced', 'Eco-friendly', 'Solutions', 'Future', 'Energy', 'AI', 'Innovation', 'Global', 'Food', 'Robotics', 'Green', 'nanotechnology', 'retail', 'luxury', 'technology', 'space', 'lighting', 'consumer', 'manufacturing', 'goods', 'travel'];

export const getRandomSuggestions = (count: number = 3): string[] => {
  const shuffled = [...searchSuggestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const filterSuggestions = (query: string): string[] => {
  const lowercaseQuery = query.toLowerCase();
  return searchSuggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 5); // Limit to top 5 matches
};
