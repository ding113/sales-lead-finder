import { Distributor as AppDistributor } from "../types";

interface SummaryResult {
  industryDistribution: { [key: string]: number };
  locationDistribution: { [key: string]: number };
  averageRating: number;
  companySizeDistribution: { [key: string]: number };
  topDistributors: AppDistributor[];
  insights: string[];
  recommendations: string[];
}

export const generateSummary = async (
  distributors: AppDistributor[],
): Promise<SummaryResult> => {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const summary: SummaryResult = {
    industryDistribution: {},
    locationDistribution: {},
    averageRating: 0,
    companySizeDistribution: {},
    topDistributors: [],
    insights: [],
    recommendations: [],
  };

  // Calculate distributions
  distributors.forEach((distributor) => {
    // Handle multiple industries
    distributor.industry.forEach((ind) => {
      summary.industryDistribution[ind] =
        (summary.industryDistribution[ind] || 0) + 1;
    });

    summary.locationDistribution[distributor.location] =
      (summary.locationDistribution[distributor.location] || 0) + 1;
    summary.companySizeDistribution[distributor.companySize] =
      (summary.companySizeDistribution[distributor.companySize] || 0) + 1;
  });

  // Calculate average rating
  const totalRating = distributors.reduce((sum, dist) => sum + dist.rating, 0);
  summary.averageRating =
    distributors.length > 0
      ? Number((totalRating / distributors.length).toFixed(1))
      : 0;

  // Get top 5 distributors by rating
  summary.topDistributors = [...distributors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Generate insights
  const dominantIndustry = Object.entries(summary.industryDistribution).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const dominantLocation = Object.entries(summary.locationDistribution).sort(
    (a, b) => b[1] - a[1],
  )[0];

  summary.insights = [
    `${((dominantIndustry[1] / distributors.length) * 100).toFixed(1)}% of distributors are in the ${dominantIndustry[0]} industry`,
    `${((dominantLocation[1] / distributors.length) * 100).toFixed(1)}% of distributors are located in ${dominantLocation[0]}`,
    `The average distributor rating is ${summary.averageRating}/5`,
    `${summary.topDistributors.length} top-performing distributors identified`,
  ];

  // Generate recommendations
  summary.recommendations = [
    `Consider exploring ${
      Object.entries(summary.industryDistribution).sort(
        (a, b) => a[1] - b[1],
      )[0][0]
    } industry for untapped opportunities`,
    `Look into expanding presence in ${
      Object.entries(summary.locationDistribution).sort(
        (a, b) => a[1] - b[1],
      )[0][0]
    } to increase geographic coverage`,
    `Focus on distributors with ratings above ${summary.averageRating} for optimal partnerships`,
    `Target companies of size ${
      Object.entries(summary.companySizeDistribution).sort(
        (a, b) => b[1] - a[1],
      )[0][0]
    } as they show strong presence in the market`,
  ];

  return summary;
};

export const formatSummary = (summary: SummaryResult): string => {
  const formatDistribution = (dist: { [key: string]: number }) => {
    return Object.entries(dist)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  return `📊 Search Results Analysis

🏭 Industry Distribution:
${formatDistribution(summary.industryDistribution)}

📍 Location Distribution:
${formatDistribution(summary.locationDistribution)}

🏢 Company Size Distribution:
${formatDistribution(summary.companySizeDistribution)}

⭐ Average Rating: ${summary.averageRating}

🏆 Top Performing Distributors:
${summary.topDistributors.map((d, i) => `${i + 1}. ${d.companyName} (${d.rating}⭐)`).join("\n")}

🔍 Key Insights:
${summary.insights.map((insight) => `• ${insight}`).join("\n")}

💡 Recommendations:
${summary.recommendations.map((rec) => `• ${rec}`).join("\n")}`;
};
