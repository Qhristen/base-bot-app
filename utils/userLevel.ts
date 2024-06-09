const LeagueBadges: Record<string, string> = {
  novice: `/badges/NoviceBadge.png`,
  rookie: `/badges/RookieBadge.png`,
  senior: `/badges/SeniorBadge.png`,
  junior: `/badges/JuniorBadge.png`,
  genius: `/badges/GeniusBadge.png`,
  advanced: `/badges/AdvancedBadge.png`,
  expert: `/badges/ExpertBadge.png`,
  master: `/badges/MasterBadge.png`,
  legend: `/badges/LegendBadge.png`,
};

export const getImageForUserLevel = (userLevel: string): string => {
  return LeagueBadges[userLevel] || LeagueBadges.novice;
};
