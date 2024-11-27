export const searchSuggestions = [
  "AI",
  "Medical",
  "Automotive",
  // 'Electronic Components',
  // 'Semiconductor Manufacturers',
  // 'Industrial Equipment',
  // 'Medical Devices',
  // 'Automotive Parts',
  // 'Aerospace Components',
  // 'Consumer Electronics',
  // 'Network Equipment',
  // 'Power Supplies',
  // 'LED Lighting',
  // 'PCB Manufacturing',
  // 'Robotics Components',
  // 'Wireless Modules',
  // 'Test Equipment',
  // 'IoT Devices'
];

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
