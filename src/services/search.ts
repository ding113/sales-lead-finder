import Fuse from 'fuse.js';
import { Distributor } from '../types';

// 搜索配置
const searchOptions = {
  keys: [
    { name: 'companyName', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'tags', weight: 1.5 },
    { name: 'industry', weight: 1.5 },
    { name: 'location', weight: 1 }
  ],
  threshold: 0.3, // 匹配阈值，越低越严格
  includeScore: true,
  shouldSort: true,
  minMatchCharLength: 2
};

class SearchService {
  private fuse: Fuse<Distributor>;
  private static instance: SearchService;

  private constructor(items: Distributor[]) {
    this.fuse = new Fuse(items, searchOptions);
  }

  static getInstance(items: Distributor[]): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService(items);
    }
    return SearchService.instance;
  }

  search(query: string): Distributor[] {
    if (!query.trim()) {
      return [];
    }
    const results = this.fuse.search(query);
    return results.map(result => result.item);
  }

  updateItems(items: Distributor[]) {
    this.fuse.setCollection(items);
  }
}

export default SearchService;