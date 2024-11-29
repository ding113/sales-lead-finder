import { Category } from "../types";

export const industryCategories: Category[] = [
  {
    label: "Technology & Innovation",
    value: "technology",
    subCategories: [
      { label: "Artificial Intelligence", value: "artificial-intelligence" },
      { label: "Electronics", value: "electronics" },
      { label: "Technology", value: "technology" },
      { label: "Nanotechnology", value: "nanotechnology" },
      { label: "Space", value: "space" },
    ],
  },
  {
    label: "Healthcare & Life Sciences",
    value: "healthcare",
    subCategories: [
      { label: "Healthcare", value: "healthcare" },
      { label: "Pharmaceutical", value: "pharmaceutical" },
      { label: "Biotechnology", value: "biotechnology" },
      { label: "Fitness", value: "fitness" },
    ],
  },
  {
    label: "Industrial & Manufacturing",
    value: "industrial",
    subCategories: [
      { label: "Industrial", value: "industrial" },
      { label: "Manufacturing", value: "manufacturing" },
      { label: "Construction", value: "construction" },
      { label: "Chemical", value: "chemical" },
      { label: "Energy", value: "energy" },
    ],
  },
  {
    label: "Consumer & Retail",
    value: "consumer",
    subCategories: [
      { label: "Retail", value: "retail" },
      { label: "Consumer Goods", value: "consumer-goods" },
      { label: "Food & Beverage", value: "food-beverage" },
      { label: "Fashion", value: "fashion" },
      { label: "Cosmetics", value: "cosmetics" },
      { label: "Luxury", value: "luxury" },
    ],
  },
  {
    label: "Transportation & Logistics",
    value: "transportation",
    subCategories: [
      { label: "Transportation", value: "transportation" },
      { label: "Automotive", value: "automotive" },
      { label: "Travel", value: "travel" },
    ],
  },
  {
    label: "Other Industries",
    value: "other",
    subCategories: [
      { label: "Agriculture", value: "agriculture" },
      { label: "Media", value: "media" },
      { label: "Textiles", value: "textiles" },
      { label: "Lighting", value: "lighting" },
    ],
  },
];

export const locationCategories: Category[] = [
  {
    label: "Asia Pacific",
    value: "asia-pacific",
    subCategories: [
      { label: "China", value: "china" },
      { label: "Japan", value: "japan" },
      { label: "South Korea", value: "south-korea" },
      { label: "Singapore", value: "singapore" },
      { label: "India", value: "india" },
      { label: "Australia", value: "australia" },
      { label: "Thailand", value: "thailand" },
    ],
  },
  {
    label: "Europe",
    value: "europe",
    subCategories: [
      { label: "Germany", value: "germany" },
      { label: "France", value: "france" },
      { label: "United Kingdom", value: "united-kingdom" },
      { label: "Italy", value: "italy" },
      { label: "Netherlands", value: "netherlands" },
      { label: "Sweden", value: "sweden" },
      { label: "Switzerland", value: "switzerland" },
      { label: "Spain", value: "spain" },
      { label: "Finland", value: "finland" },
      { label: "Denmark", value: "denmark" },
      { label: "Norway", value: "norway" },
      { label: "Russia", value: "russia" },
    ],
  },
  {
    label: "Americas",
    value: "americas",
    subCategories: [
      { label: "United States", value: "united-states" },
      { label: "Canada", value: "canada" },
      { label: "Brazil", value: "brazil" },
      { label: "Argentina", value: "argentina" },
    ],
  },
  {
    label: "Middle East & Africa",
    value: "middle-east-africa",
    subCategories: [
      { label: "United Arab Emirates", value: "united-arab-emirates" },
      { label: "Israel", value: "israel" },
      { label: "Turkey", value: "turkey" },
      { label: "South Africa", value: "south-africa" },
    ],
  },
];
