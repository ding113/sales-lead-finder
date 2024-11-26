import { Distributor } from '../types';

export const mockDistributors: Distributor[] = [
  {
    id: '1',
    companyName: 'Global Trade Solutions',
    description: 'Leading distributor of industrial equipment with worldwide presence',
    location: 'Singapore',
    industry: ['Industrial', 'Manufacturing'],
    establishedYear: 2005,
    companySize: '100-500',
    contact: {
      email: 'contact@globaltrade.com',
      phone: '+65 6789 0123',
      website: 'www.globaltrade.com'
    },
    tags: ['Industrial Equipment', 'Global Distribution', 'B2B'],
    rating: 4.5
  },
  // ... 添加更多模拟数据
];

export const mockIndustries = [
  'Industrial',
  'Manufacturing',
  'Electronics',
  'Chemical',
  'Automotive',
  'Consumer Goods',
  'Healthcare',
  'Technology'
];

export const mockLocations = [
  'Singapore',
  'China',
  'United States',
  'Germany',
  'Japan',
  'South Korea',
  'United Kingdom',
  'India'
];

export const mockCompanySizes = [
  '1-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];