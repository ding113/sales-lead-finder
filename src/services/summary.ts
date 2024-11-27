interface Distributor {
  name: string;
  industry: string;
  location: string;
  companySize: string;
  rating: number;
  description: string;
  website: string;
  contactEmail: string;
}

interface SummaryResult {
  industryDistribution: { [key: string]: number };
  locationDistribution: { [key: string]: number };
  averageRating: number;
  companySizeDistribution: { [key: string]: number };
  topDistributors: Distributor[];
}

export const generateSummary = (distributors: Distributor[]): SummaryResult => {
  const summary: SummaryResult = {
    industryDistribution: {},
    locationDistribution: {},
    averageRating: 0,
    companySizeDistribution: {},
    topDistributors: []
  };

  // Calculate distributions
  distributors.forEach(distributor => {
    // Industry distribution
    summary.industryDistribution[distributor.industry] = 
      (summary.industryDistribution[distributor.industry] || 0) + 1;

    // Location distribution
    summary.locationDistribution[distributor.location] = 
      (summary.locationDistribution[distributor.location] || 0) + 1;

    // Company size distribution
    summary.companySizeDistribution[distributor.companySize] = 
      (summary.companySizeDistribution[distributor.companySize] || 0) + 1;
  });

  // Calculate average rating
  const totalRating = distributors.reduce((sum, dist) => sum + dist.rating, 0);
  summary.averageRating = distributors.length > 0 
    ? Number((totalRating / distributors.length).toFixed(1))
    : 0;

  // Get top 3 distributors by rating
  summary.topDistributors = [...distributors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return summary;
};

export const formatSummary = (summary: SummaryResult): string => {
  const formatDistribution = (dist: { [key: string]: number }) => {
    const total = Object.values(dist).reduce((sum, count) => sum + count, 0);
    return Object.entries(dist)
      .map(([key, count]) => `${key}: ${Math.round((count / total) * 100)}%`)
      .join('\n');
  };

  return `
📊 Distributor Network Analysis

🏢 Industry Distribution:
${formatDistribution(summary.industryDistribution)}

📍 Geographic Distribution:
${formatDistribution(summary.locationDistribution)}

⭐ Average Rating: ${summary.averageRating}/5

👥 Company Size Distribution:
${formatDistribution(summary.companySizeDistribution)}

🏆 Top Rated Distributors:
${summary.topDistributors.map((d, i) => 
  `${i + 1}. ${d.name} (${d.industry}) - ${d.rating}⭐`
).join('\n')}
`;
};
