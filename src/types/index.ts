export interface Distributor {
    id: string;
    companyName: string;
    description: string;
    location: string;
    industry: string[];
    establishedYear: number;
    companySize: string;
    contact: {
      email: string;
      phone: string;
      website: string;
    };
    tags: string[];
    rating: number;
  }
  
  export interface SearchFilters {
    industry: string[];
    location: string[];
    companySize: string[];
    establishedYear: {
      min: number;
      max: number;
    };
    rating: number;
  }
  
  export interface WishlistItem extends Distributor {
    addedAt: Date;
    notes?: string;
  }