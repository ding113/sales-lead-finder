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
  {
    id: '2',
    companyName: 'Tech Innovators',
    description: 'Innovative solutions for tech industry needs',
    location: 'United States',
    industry: ['Technology', 'Electronics'],
    establishedYear: 2010,
    companySize: '51-200',
    contact: {
      email: 'info@techinnovators.com',
      phone: '+1 234 567 890',
      website: 'www.techinnovators.com'
    },
    tags: ['Innovation', 'Technology', 'Electronics'],
    rating: 4.0
  },
  {
    id: '3',
    companyName: 'Healthcare Partners',
    description: 'Providing exceptional healthcare products and services',
    location: 'Germany',
    industry: ['Healthcare'],
    establishedYear: 1998,
    companySize: '201-500',
    contact: {
      email: 'service@healthcarepartners.de',
      phone: '+49 123 456 789',
      website: 'www.healthcarepartners.de'
    },
    tags: ['Healthcare', 'Service', 'Products'],
    rating: 4.7
  },
  {
    id: '4',
    companyName: 'Automotive Experts',
    description: 'Leading supplier in the automotive industry',
    location: 'Japan',
    industry: ['Automotive'],
    establishedYear: 1985,
    companySize: '1000+',
    contact: {
      email: 'contact@autoexperts.jp',
      phone: '+81 90 1234 5678',
      website: 'www.autoexperts.jp'
    },
    tags: ['Automotive', 'Supplier', 'Cars'],
    rating: 4.3
  },
  {
    id: '5',
    companyName: 'Consumer Goods Co.',
    description: 'High-quality consumer goods for markets worldwide',
    location: 'China',
    industry: ['Consumer Goods'],
    establishedYear: 2000,
    companySize: '501-1000',
    contact: {
      email: 'info@consumergoods.cn',
      phone: '+86 10 1234 5678',
      website: 'www.consumergoods.cn'
    },
    tags: ['Consumer Goods', 'Quality', 'Global'],
    rating: 4.6
  },
  {
    id: '6',
    companyName: 'Chemical Solutions Ltd.',
    description: 'Experts in chemical distribution',
    location: 'United Kingdom',
    industry: ['Chemical'],
    establishedYear: 1995,
    companySize: '51-200',
    contact: {
      email: 'contact@chemicalsolutions.co.uk',
      phone: '+44 20 7946 0958',
      website: 'www.chemicalsolutions.co.uk'
    },
    tags: ['Chemical', 'Distribution', 'Expertise'],
    rating: 4.2
  },
  {
    id: '7',
    companyName: 'Electronics Hub',
    description: 'Your one-stop shop for electronics components',
    location: 'South Korea',
    industry: ['Electronics'],
    establishedYear: 2008,
    companySize: '201-500',
    contact: {
      email: 'support@electronicshub.kr',
      phone: '+82 2 999 8888',
      website: 'www.electronicshub.kr'
    },
    tags: ['Electronics', 'Components', 'Hub'],
    rating: 4.4
  },
  {
    id: '8',
    companyName: 'Indian Manufacturing Inc.',
    description: 'Focused on manufacturing excellence',
    location: 'India',
    industry: ['Manufacturing'],
    establishedYear: 1980,
    companySize: '1000+',
    contact: {
      email: 'info@indianmfg.in',
      phone: '+91 11 2345 6789',
      website: 'www.indianmfg.in'
    },
    tags: ['Manufacturing', 'Excellence', 'India'],
    rating: 4.8
  },
  {
    id: '9',
    companyName: 'Healthcare Innovations',
    description: 'Pioneers in healthcare technology',
    location: 'Singapore',
    industry: ['Healthcare', 'Technology'],
    establishedYear: 2015,
    companySize: '1-50',
    contact: {
      email: 'innovate@healthcare.sg',
      phone: '+65 9876 5432',
      website: 'www.healthcareinnovations.sg'
    },
    tags: ['Healthcare', 'Technology', 'Pioneers'],
    rating: 4.9
  },
  {
    id: '10',
    companyName: 'Asian Electronics Ltd.',
    description: 'Supplying Asia\'s leading electronic brands',
    location: 'South Korea',
    industry: ['Electronics'],
    establishedYear: 1992,
    companySize: '501-1000',
    contact: {
      email: 'sales@asianelectronics.co.kr',
      phone: '+82 10 8765 4321',
      website: 'www.asianelectronics.co.kr'
    },
    tags: ['Electronics', 'Supplier', 'Asia'],
    rating: 4.1
  },
  // 添加更多的公司数据直到达到50个
  {
    id: '11',
    companyName: 'Eco Farming Solutions',
    description: 'Innovations in sustainable agriculture',
    location: 'Australia',
    industry: ['Agriculture', 'Technology'],
    establishedYear: 2012,
    companySize: '51-200',
    contact: {
      email: 'info@ecofarming.au',
      phone: '+61 3 9587 1234',
      website: 'www.ecofarming.au'
    },
    tags: ['Agriculture', 'Sustainability', 'Innovation'],
    rating: 4.3
  },
  {
    id: '12',
    companyName: 'Fashion Forward',
    description: 'Trendsetting fashion company with a global footprint',
    location: 'Italy',
    industry: ['Fashion', 'Retail'],
    establishedYear: 1988,
    companySize: '501-1000',
    contact: {
      email: 'contact@fashionforward.it',
      phone: '+39 06 1234 5678',
      website: 'www.fashionforward.it'
    },
    tags: ['Fashion', 'Trends', 'Global'],
    rating: 4.6
  },
  {
    id: '13',
    companyName: 'Food & Beverage Inc.',
    description: 'Quality food products for everyday consumers',
    location: 'Brazil',
    industry: ['Food & Beverage'],
    establishedYear: 1993,
    companySize: '1000+',
    contact: {
      email: 'service@foodandbev.br',
      phone: '+55 11 3456 7890',
      website: 'www.foodandbev.br'
    },
    tags: ['Food', 'Beverage', 'Quality'],
    rating: 4.4
  },
  {
    id: '14',
    companyName: 'Renewable Energy Ltd.',
    description: 'Pioneers in renewable energy solutions',
    location: 'Norway',
    industry: ['Energy', 'Technology'],
    establishedYear: 2007,
    companySize: '201-500',
    contact: {
      email: 'info@renewenergy.no',
      phone: '+47 22 345 678',
      website: 'www.renewenergy.no'
    },
    tags: ['Renewable Energy', 'Innovation', 'Green Tech'],
    rating: 4.8
  },
  {
    id: '15',
    companyName: 'Cosmetic Creations',
    description: 'Innovative solutions for the beauty industry',
    location: 'France',
    industry: ['Cosmetics'],
    establishedYear: 1999,
    companySize: '501-1000',
    contact: {
      email: 'info@cosmeticcreations.fr',
      phone: '+33 1 234 56789',
      website: 'www.cosmeticcreations.fr'
    },
    tags: ['Beauty', 'Cosmetics', 'Innovation'],
    rating: 4.5
  },
  {
    id: '16',
    companyName: 'Fashion Fusion',
    description: 'Blending technology with fashion',
    location: 'Sweden',
    industry: ['Fashion', 'Technology'],
    establishedYear: 2010,
    companySize: '51-200',
    contact: {
      email: 'contact@fashionfusion.se',
      phone: '+46 8 123 4567',
      website: 'www.fashionfusion.se'
    },
    tags: ['Fashion', 'Tech', 'Innovation'],
    rating: 4.6
  },
  {
    id: '17',
    companyName: 'Urban Solutions',
    description: 'Solving urban infrastructure challenges',
    location: 'Canada',
    industry: ['Construction', 'Infrastructure'],
    establishedYear: 1990,
    companySize: '1000+',
    contact: {
      email: 'info@urbansolutions.ca',
      phone: '+1 416 123 4567',
      website: 'www.urbansolutions.ca'
    },
    tags: ['Infrastructure', 'Urban', 'Solutions'],
    rating: 4.7
  },
  {
    id: '18',
    companyName: 'Smart Education Inc.',
    description: 'Education technology to enhance learning',
    location: 'Finland',
    industry: ['Education', 'Technology'],
    establishedYear: 2015,
    companySize: '1-50',
    contact: {
      email: 'info@smartedu.fi',
      phone: '+358 9 1234 5678',
      website: 'www.smartedu.fi'
    },
    tags: ['Education', 'Technology', 'Innovation'],
    rating: 4.9
  },
  {
    id: '19',
    companyName: 'Gourmet Delights',
    description: 'Premium gourmet food products',
    location: 'Spain',
    industry: ['Food & Beverage'],
    establishedYear: 1982,
    companySize: '201-500',
    contact: {
      email: 'service@gourmetdelights.es',
      phone: '+34 91 234 5678',
      website: 'www.gourmetdelights.es'
    },
    tags: ['Gourmet', 'Food', 'Premium'],
    rating: 4.7
  },
  {
    id: '20',
    companyName: 'AeroTech Innovations',
    description: 'Aerospace and defense technology advancements',
    location: 'United States',
    industry: ['Aerospace', 'Defense', 'Technology'],
    establishedYear: 2003,
    companySize: '501-1000',
    contact: {
      email: 'info@aerotech.us',
      phone: '+1 833 567 8901',
      website: 'www.aerotech.us'
    },
    tags: ['Aerospace', 'Defense', 'Innovation'],
    rating: 4.6
  },
  {
    id: '21',
    companyName: 'Textile Works Ltd.',
    description: 'Leading textile manufacturer with innovative fabrics',
    location: 'Turkey',
    industry: ['Textiles', 'Manufacturing'],
    establishedYear: 1985,
    companySize: '1000+',
    contact: {
      email: 'info@textileworks.tr',
      phone: '+90 212 123 4567',
      website: 'www.textileworks.tr'
    },
    tags: ['Textiles', 'Fabric', 'Innovation'],
    rating: 4.5
  },
  {
    id: '22',
    companyName: 'Pharma Solutions Inc.',
    description: 'Pharmaceutical innovations and healthcare solutions',
    location: 'Switzerland',
    industry: ['Pharmaceutical', 'Healthcare'],
    establishedYear: 2001,
    companySize: '201-500',
    contact: {
      email: 'contact@pharmasolutions.ch',
      phone: '+41 31 123 4567',
      website: 'www.pharmasolutions.ch'
    },
    tags: ['Pharmaceutical', 'Innovation', 'Healthcare'],
    rating: 4.8
  },
  {
    id: '23',
    companyName: 'Fast Tech Services',
    description: 'Smart technology solutions for fast-paced environments',
    location: 'Singapore',
    industry: ['Technology'],
    establishedYear: 2012,
    companySize: '1-50',
    contact: {
      email: 'support@fasttech.sg',
      phone: '+65 6123 4567',
      website: 'www.fasttech.sg'
    },
    tags: ['Technology', 'Services', 'Smart'],
    rating: 4.2
  },
  {
    id: '24',
    companyName: 'Green Energy Co.',
    description: 'Innovative green energy solutions',
    location: 'Denmark',
    industry: ['Energy', 'Technology'],
    establishedYear: 2009,
    companySize: '51-200',
    contact: {
      email: 'info@greenenergy.dk',
      phone: '+45 21 123 456',
      website: 'www.greenenergy.dk'
    },
    tags: ['Green', 'Energy', 'Innovation'],
    rating: 4.9
  },
  {
    id: '25',
    companyName: 'Luxury Living Ltd.',
    description: 'Premium home and lifestyle products',
    location: 'United Arab Emirates',
    industry: ['Retail', 'Home'],
    establishedYear: 1999,
    companySize: '501-1000',
    contact: {
      email: 'contact@luxuryliving.ae',
      phone: '+971 4 1234 567',
      website: 'www.luxuryliving.ae'
    },
    tags: ['Luxury', 'Home', 'Lifestyle'],
    rating: 4.7
  },
  {
    id: '26',
    companyName: 'Agricultural Advancements',
    description: 'Advanced agricultural equipment and solutions',
    location: 'Argentina',
    industry: ['Agriculture'],
    establishedYear: 1994,
    companySize: '201-500',
    contact: {
      email: 'info@agricadvances.ar',
      phone: '+54 11 2345 6789',
      website: 'www.agricadvances.ar'
    },
    tags: ['Agriculture', 'Equipment', 'Solutions'],
    rating: 4.3
  },
  {
    id: '27',
    companyName: 'Nano Health Inc.',
    description: 'Pioneering nanotechnology in healthcare solutions',
    location: 'United States',
    industry: ['Nanotechnology', 'Healthcare'],
    establishedYear: 2018,
    companySize: '51-200',
    contact: {
      email: 'info@nanohealth.us',
      phone: '+1 866 987 6543',
      website: 'www.nanohealth.us'
    },
    tags: ['Nanotechnology', 'Healthcare', 'Innovation'],
    rating: 4.5
  },
  {
    id: '28',
    companyName: 'Auto Mobility Solutions',
    description: 'Innovative solutions for electric and autonomous vehicles',
    location: 'Germany',
    industry: ['Automotive', 'Technology'],
    establishedYear: 2013,
    companySize: '100-500',
    contact: {
      email: 'info@automobilty.de',
      phone: '+49 40 9876 5432',
      website: 'www.automobilty.de'
    },
    tags: ['Automotive', 'Electric Vehicles', 'Autonomous'],
    rating: 4.6
  },
  {
    id: '29',
    companyName: 'Space Explorers Ltd.',
    description: 'Pioneers in commercial space exploration',
    location: 'United States',
    industry: ['Space', 'Technology'],
    establishedYear: 2020,
    companySize: '1-50',
    contact: {
      email: 'info@spaceexplorers.us',
      phone: '+1 999 987 6543',
      website: 'www.spaceexplorers.us'
    },
    tags: ['Space', 'Exploration', 'Innovation'],
    rating: 4.8
  },
  {
    id: '30',
    companyName: 'Digital Media Group',
    description: 'Leading provider of digital media solutions',
    location: 'South Africa',
    industry: ['Media', 'Technology'],
    establishedYear: 2001,
    companySize: '501-1000',
    contact: {
      email: 'info@dmg.co.za',
      phone: '+27 12 345 6789',
      website: 'www.dmg.co.za'
    },
    tags: ['Media', 'Digital', 'Innovation'],
    rating: 4.4
  },
  {
    id: '31',
    companyName: 'Construction Innovations',
    description: 'Revolutionizing modern construction techniques',
    location: 'China',
    industry: ['Construction', 'Technology'],
    establishedYear: 2003,
    companySize: '1000+',
    contact: {
      email: 'info@constructinnov.cn',
      phone: '+86 21 9876 5432',
      website: 'www.constructinnov.cn'
    },
    tags: ['Construction', 'Tech', 'Revolution'],
    rating: 4.6
  },
  {
    id: '32',
    companyName: 'Gadget Galaxy',
    description: 'Distinctive gadgets and tech for modern consumers',
    location: 'South Korea',
    industry: ['Electronics', 'Retail'],
    establishedYear: 2005,
    companySize: '201-500',
    contact: {
      email: 'info@gadgetgalaxy.kr',
      phone: '+82 2 1234 5678',
      website: 'www.gadgetgalaxy.kr'
    },
    tags: ['Gadgets', 'Tech', 'Consumer'],
    rating: 4.5
  },
  {
    id: '33',
    companyName: 'Transport Excellence Ltd.',
    description: 'Innovative solutions in logistics and transportation',
    location: 'Netherlands',
    industry: ['Transportation', 'Logistics'],
    establishedYear: 1997,
    companySize: '100-500',
    contact: {
      email: 'info@transporte.nl',
      phone: '+31 20 1234 5678',
      website: 'www.transporte.nl'
    },
    tags: ['Transportation', 'Logistics', 'Innovation'],
    rating: 4.7
  },
  {
    id: '34',
    companyName: 'Smart Tech Industries',
    description: 'Smart solutions for interconnected industries',
    location: 'United Kingdom',
    industry: ['Technology', 'Manufacturing'],
    establishedYear: 2010,
    companySize: '201-500',
    contact: {
      email: 'info@smarttechindustries.co.uk',
      phone: '+44 20 9876 5432',
      website: 'www.smarttechindustries.co.uk'
    },
    tags: ['Smart', 'Tech', 'Industries'],
    rating: 4.6
  },
  {
    id: '35',
    companyName: 'Eco Friendly Products',
    description: 'Eco-friendly solutions for the everyday consumer',
    location: 'Canada',
    industry: ['Retail', 'Sustainability'],
    establishedYear: 2008,
    companySize: '51-200',
    contact: {
      email: 'info@ecofriendly.ca',
      phone: '+1 604 123 4567',
      website: 'www.ecofriendly.ca'
    },
    tags: ['Eco-friendly', 'Retail', 'Sustainability'],
    rating: 4.4
  },
  {
    id: '36',
    companyName: 'Marine Innovations Ltd.',
    description: 'Specializing in advanced marine technology',
    location: 'Norway',
    industry: ['Marine', 'Technology'],
    establishedYear: 2011,
    companySize: '100-500',
    contact: {
      email: 'info@marineinnov.no',
      phone: '+47 21 911 3456',
      website: 'www.marineinnov.no'
    },
    tags: ['Marine', 'Technology', 'Innovation'],
    rating: 4.7
  },
  {
    id: '37',
    companyName: 'Smart Home Technologies',
    description: 'Innovative tech for modern-day smart homes',
    location: 'Australia',
    industry: ['Technology', 'Home'],
    establishedYear: 2009,
    companySize: '51-200',
    contact: {
      email: 'support@smarthometech.au',
      phone: '+61 2 3456 7890',
      website: 'www.smarthometech.au'
    },
    tags: ['Smart Home', 'Technology', 'Innovation'],
    rating: 4.8
  },
  {
    id: '38',
    companyName: 'Herbal Solutions Inc.',
    description: 'Natural herbal health solutions for a better life',
    location: 'India',
    industry: ['Healthcare', 'Natural Products'],
    establishedYear: 1988,
    companySize: '501-1000',
    contact: {
      email: 'contact@herbalsolutions.in',
      phone: '+91 40 2345 6789',
      website: 'www.herbalsolutions.in'
    },
    tags: ['Herbal', 'Healthcare', 'Natural'],
    rating: 4.5
  },
  {
    id: '39',
    companyName: 'Autonomous Innovations',
    description: 'Innovations in autonomous robotics',
    location: 'Germany',
    industry: ['Robotics', 'Technology'],
    establishedYear: 2012,
    companySize: '1-50',
    contact: {
      email: 'info@autonomousinnov.de',
      phone: '+49 89 1234 5678',
      website: 'www.autonomousinnov.de'
    },
    tags: ['Robotics', 'Autonomous', 'Innovation'],
    rating: 4.7
  },
  {
    id: '40',
    companyName: 'Solar Tech Solutions',
    description: 'Leading provider of solar technology products',
    location: 'China',
    industry: ['Energy', 'Technology'],
    establishedYear: 2001,
    companySize: '1000+',
    contact: {
      email: 'info@solartechnology.cn',
      phone: '+86 21 3456 7890',
      website: 'www.solartechnology.cn'
    },
    tags: ['Solar', 'Energy', 'Technology'],
    rating: 4.8
  },
  {
    id: '41',
    companyName: 'Luxury Auto',
    description: 'Luxury automotive brand with cutting-edge technology',
    location: 'Italy',
    industry: ['Automotive', 'Luxury'],
    establishedYear: 1980,
    companySize: '1000+',
    contact: {
      email: 'sales@luxuryauto.it',
      phone: '+39 02 6789 2345',
      website: 'www.luxuryauto.it'
    },
    tags: ['Luxury', 'Automotive', 'Technology'],
    rating: 4.9
  },
  {
    id: '42',
    companyName: 'Fitness First',
    description: 'Innovative fitness equipment for professionals',
    location: 'United States',
    industry: ['Fitness', 'Equipment'],
    establishedYear: 2006,
    companySize: '501-1000',
    contact: {
      email: 'info@fitnessfirst.us',
      phone: '+1 345 123 6789',
      website: 'www.fitnessfirst.us'
    },
    tags: ['Fitness', 'Equipment', 'Innovation'],
    rating: 4.6
  },
  {
    id: '43',
    companyName: 'Tech Gadgets Ltd.',
    description: 'Supplier of top-notch electronic gadgets',
    location: 'Japan',
    industry: ['Electronics', 'Retail'],
    establishedYear: 1999,
    companySize: '501-1000',
    contact: {
      email: 'sales@techgadgets.jp',
      phone: '+81 3 3456 7890',
      website: 'www.techgadgets.jp'
    },
    tags: ['Electronics', 'Gadgets', 'Retail'],
    rating: 4.5
  },
  {
    id: '44',
    companyName: 'AI Innovations',
    description: 'AI-driven solutions for modern businesses',
    location: 'United Kingdom',
    industry: ['Artificial Intelligence', 'Technology'],
    establishedYear: 2013,
    companySize: '201-500',
    contact: {
      email: 'info@aiinnovations.co.uk',
      phone: '+44 161 789 2345',
      website: 'www.aiinnovations.co.uk'
    },
    tags: ['AI', 'Technology', 'Business'],
    rating: 4.7
  },
  {
    id: '45',
    companyName: 'BioTech World',
    description: 'Advancements in biotechnology for the future',
    location: 'Russia',
    industry: ['Biotechnology', 'Research'],
    establishedYear: 2008,
    companySize: '100-500',
    contact: {
      email: 'contact@biotechworld.ru',
      phone: '+7 812 123 4567',
      website: 'www.biotechworld.ru'
    },
    tags: ['Biotech', 'Research', 'Future'],
    rating: 4.5
  },
  {
    id: '46',
    companyName: 'NextGen Solutions',
    description: 'Next-generation technology for modern problems',
    location: 'Netherlands',
    industry: ['Technology'],
    establishedYear: 2017,
    companySize: '51-200',
    contact: {
      email: 'info@nextgensolutions.nl',
      phone: '+31 10 234 5678',
      website: 'www.nextgensolutions.nl'
    },
    tags: ['NextGen', 'Technology', 'Innovation'],
    rating: 4.6
  },
  {
    id: '47',
    companyName: 'AI Creators Inc.',
    description: 'Artificial intelligence solutions for diverse industries',
    location: 'Canada',
    industry: ['Artificial Intelligence', 'Technology'],
    establishedYear: 2019,
    companySize: '1-50',
    contact: {
      email: 'info@aicreators.ca',
      phone: '+1 705 123 4567',
      website: 'www.aicreators.ca'
    },
    tags: ['AI', 'Diverse', 'Solutions'],
    rating: 4.8
  },
  {
    id: '48',
    companyName: 'MedTech Pioneers',
    description: 'Pioneering advancements in medical technology',
    location: 'Israel',
    industry: ['Medical', 'Technology'],
    establishedYear: 2005,
    companySize: '501-1000',
    contact: {
      email: 'info@medtechpioneers.il',
      phone: '+972 3 123 4567',
      website: 'www.medtechpioneers.il'
    },
    tags: ['Medical', 'Innovation', 'Technology'],
    rating: 4.7
  },
  {
    id: '49',
    companyName: 'Green Light Innovations',
    description: 'Sustainable lighting solutions for a greener planet',
    location: 'Brazil',
    industry: ['Lighting', 'Sustainability'],
    establishedYear: 2010,
    companySize: '201-500',
    contact: {
      email: 'info@greenlights.br',
      phone: '+55 21 3456 7890',
      website: 'www.greenlights.br'
    },
    tags: ['Lighting', 'Sustainable', 'Planet'],
    rating: 4.4
  },
  {
    id: '50',
    companyName: 'Travel Tech Ltd.',
    description: 'Tech solutions for the evolving travel industry',
    location: 'Thailand',
    industry: ['Travel', 'Technology'],
    establishedYear: 2011,
    companySize: '100-500',
    contact: {
      email: 'contact@traveltech.co.th',
      phone: '+66 2 123 4567',
      website: 'www.traveltech.co.th'
    },
    tags: ['Travel', 'Technology', 'Solutions'],
    rating: 4.6
  },
];

export const mockIndustries = [
  'Industrial',
  'Manufacturing',
  'Electronics',
  'Chemical',
  'Automotive',
  'Consumer Goods',
  'Healthcare',
  'Technology',
  'Agriculture',
  'Fashion',
  'Retail',
  'Food & Beverage',
  'Energy',
  'Cosmetics',
  'Construction',
  'Nanotechnology',
  'Space',
  'Media',
  'Transportation',
  'Textiles',
  'Pharmaceutical',
  'Luxury',
  'Fitness',
  'Artificial Intelligence',
  'Biotechnology',
  'Lighting',
  'Travel'
];

export const mockLocations = [
  'Singapore',
  'China',
  'United States',
  'Germany',
  'Japan',
  'South Korea',
  'United Kingdom',
  'India',
  'Australia',
  'Italy',
  'Brazil',
  'Norway',
  'France',
  'Sweden',
  'Canada',
  'Finland',
  'Spain',
  'Turkey',
  'Switzerland',
  'Denmark',
  'United Arab Emirates',
  'Argentina',
  'Netherlands',
  'South Africa',
  'Russia',
  'Israel',
  'Thailand'
];

export const mockCompanySizes = [
  '1-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];