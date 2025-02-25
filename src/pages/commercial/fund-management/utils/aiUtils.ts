
export interface RecommendationType {
  title: string;
  description: string;
  impact: string;
}

export const parseAIRecommendations = (aiResponse: string): RecommendationType[] => {
  try {
    console.log('Parsing AI response:', aiResponse);
    
    // Split the response into recommendations
    const recommendations = aiResponse.split(/\d+\.\s+/).filter(Boolean);
    
    return recommendations.map(rec => {
      const titleMatch = rec.match(/Title:\s*(.*?)(?=\n|Description:)/s);
      const descriptionMatch = rec.match(/Description:\s*(.*?)(?=\n|Impact:)/s);
      const impactMatch = rec.match(/Impact:\s*(.*?)(?=\n|$)/s);

      return {
        title: titleMatch?.[1]?.trim() || "Recommendation",
        description: descriptionMatch?.[1]?.trim() || "No description provided",
        impact: impactMatch?.[1]?.trim() || "Impact not specified"
      };
    });
  } catch (error) {
    console.error('Error parsing AI recommendations:', error);
    return [];
  }
};
