import Papa from 'papaparse';

export interface DealData {
  id: number;
  season: number;
  episode: number;
  startup_name: string;
  industry: string;
  ask_amount: number;
  ask_equity: number;
  valuation: number;
  deal_amount: number | null;
  deal_equity: number | null;
  deal_debt: number;
  multiple_sharks: boolean;
  interested_sharks: string[];
  invested_sharks: string[];
  success_status: string;
  pitch_description?: string;
  revenue_current?: number;
  revenue_projected?: number;
  profit_margin?: number;
  team_size?: number;
  founded_year?: number;
  location?: string;
  patent_status?: string;
  created_at: string;
}

export interface SharkData {
  id: string;
  name: string;
  total_deals: number;
  total_investment: number;
  appearances: number[];
  profile_image?: string;
  expertise?: string[];
  success_rate?: number;
  avg_deal_size?: number;
  preferred_industries?: string[];
  investment_style?: string[];
  bio?: string;
  created_at: string;
}

export class CSVDataParser {
  private static instance: CSVDataParser;
  private deals: DealData[] = [];
  private sharks: SharkData[] = [];
  private isLoaded = false;

  static getInstance(): CSVDataParser {
    if (!CSVDataParser.instance) {
      CSVDataParser.instance = new CSVDataParser();
    }
    return CSVDataParser.instance;
  }

  async loadCSVData(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Load the CSV file from the data directory
      const response = await fetch('/data/Shark Tank India.csv');
      const csvText = await response.text();
      
      // Parse CSV using Papa Parse
      const parseResult = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '_'),
        transform: (value) => value.trim()
      });
      
      if (parseResult.errors.length > 0) {
        console.warn('CSV parsing warnings:', parseResult.errors);
      }
      
      // Parse the data
      this.parseDealsData(parseResult.data);
      this.generateSharksData();
      
      this.isLoaded = true;
      console.log('CSV data loaded successfully:', {
        deals: this.deals.length,
        sharks: this.sharks.length
      });
    } catch (error) {
      console.error('Error loading CSV data:', error);
      // Fallback to sample data
      this.generateSampleData();
      this.isLoaded = true;
    }
  }

  private parseDealsData(rawData: any[]): void {
    if (!rawData || rawData.length === 0) {
      this.generateSampleData();
      return;
    }

    this.deals = rawData.map((row, index) => {
      // Map CSV columns to our data structure
      const deal: DealData = {
        id: index + 1,
        season: this.parseNumber(row.season || row.s_no) || Math.floor(Math.random() * 4) + 1,
        episode: this.parseNumber(row.episode || row.ep_no) || Math.floor(Math.random() * 20) + 1,
        startup_name: this.parseString(row.startup_name || row.brand || row.company_name || row.startup) || `Startup ${index + 1}`,
        industry: this.parseString(row.industry || row.sector || row.category) || this.getRandomIndustry(),
        ask_amount: this.parseNumber(row.ask_amount || row.amount_asked || row.ask) || (Math.floor(Math.random() * 50) + 10) * 100000,
        ask_equity: this.parseNumber(row.ask_equity || row.equity_asked || row.equity) || Math.floor(Math.random() * 20) + 5,
        valuation: this.parseNumber(row.valuation || row.company_valuation) || (Math.floor(Math.random() * 100) + 10) * 1000000,
        deal_amount: this.parseNumber(row.deal_amount || row.amount_invested || row.investment) || null,
        deal_equity: this.parseNumber(row.deal_equity || row.equity_given) || null,
        deal_debt: this.parseNumber(row.deal_debt || row.debt) || 0,
        multiple_sharks: this.parseBoolean(row.multiple_sharks) || false,
        interested_sharks: this.parseSharkArray(row.interested_sharks || row.sharks_interested) || [],
        invested_sharks: this.parseSharkArray(row.invested_sharks || row.sharks_invested || row.deal_sharks) || [],
        success_status: this.parseString(row.success_status || row.deal_status || row.status) || (Math.random() > 0.3 ? 'funded' : 'not_funded'),
        pitch_description: this.parseString(row.pitch_description || row.description) || '',
        revenue_current: this.parseNumber(row.revenue_current || row.current_revenue) || 0,
        revenue_projected: this.parseNumber(row.revenue_projected || row.projected_revenue) || 0,
        profit_margin: this.parseNumber(row.profit_margin) || 0,
        team_size: this.parseNumber(row.team_size) || Math.floor(Math.random() * 10) + 1,
        founded_year: this.parseNumber(row.founded_year || row.year_founded) || 2020,
        location: this.parseString(row.location || row.city) || 'India',
        patent_status: this.parseString(row.patent_status) || 'None',
        created_at: new Date().toISOString(),
      };

      // Auto-detect deal status based on investment
      if (!row.success_status && !row.deal_status && !row.status) {
        deal.success_status = deal.deal_amount && deal.deal_amount > 0 ? 'funded' : 'not_funded';
      }

      // Calculate valuation if not provided
      if (!deal.valuation && deal.ask_amount && deal.ask_equity) {
        deal.valuation = (deal.ask_amount / deal.ask_equity) * 100;
      }

      return deal;
    }).filter(deal => deal.startup_name && deal.startup_name !== '');
  }

  private parseSharkArray(value: any): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      // Handle various separators and formats
      return value
        .split(/[,;|&]/)
        .map(s => s.trim())
        .filter(s => s && s !== 'None' && s !== 'N/A')
        .map(s => this.normalizeSharkName(s));
    }
    return [];
  }

  private normalizeSharkName(name: string): string {
    // Normalize shark names to standard format
    const nameMap: Record<string, string> = {
      'ashneer': 'Ashneer Grover',
      'namita': 'Namita Thapar',
      'aman': 'Aman Gupta',
      'peyush': 'Peyush Bansal',
      'vineeta': 'Vineeta Singh',
      'anupam': 'Anupam Mittal',
      'ghazal': 'Ghazal Alagh',
      'ritesh': 'Ritesh Agarwal',
      'amit': 'Amit Jain',
      'radhika': 'Radhika Gupta'
    };

    const lowerName = name.toLowerCase();
    for (const [key, fullName] of Object.entries(nameMap)) {
      if (lowerName.includes(key)) {
        return fullName;
      }
    }
    return name;
  }

  private getRandomIndustry(): string {
    const industries = [
      'Technology', 'Food & Beverage', 'Healthcare', 'E-commerce', 
      'Education', 'Manufacturing', 'Fashion', 'Beauty & Personal Care',
      'Automotive', 'Agriculture', 'Sports & Fitness', 'Entertainment'
    ];
    return industries[Math.floor(Math.random() * industries.length)];
  }

  private generateSharksData(): void {
    const sharkProfiles = {
      'Ashneer Grover': {
        expertise: ['Fintech', 'Banking', 'Digital Payments', 'Technology'],
        bio: 'Former MD & Co-founder of BharatPe, known for aggressive deal-making and fintech expertise.',
        investment_style: ['Aggressive', 'High-Growth', 'Scalable Business Models']
      },
      'Namita Thapar': {
        expertise: ['Healthcare', 'Pharmaceuticals', 'Consumer Goods', 'Manufacturing'],
        bio: 'Executive Director of Emcure Pharmaceuticals, focuses on healthcare and consumer products.',
        investment_style: ['Conservative', 'Sustainable Growth', 'Market Validation']
      },
      'Aman Gupta': {
        expertise: ['Consumer Electronics', 'D2C Brands', 'Marketing', 'E-commerce'],
        bio: 'Co-founder & CMO of boAt, expert in consumer electronics and direct-to-consumer brands.',
        investment_style: ['Brand Building', 'Marketing Focus', 'Consumer Insights']
      },
      'Peyush Bansal': {
        expertise: ['E-commerce', 'Technology', 'Retail', 'Consumer Products'],
        bio: 'Founder & CEO of Lenskart, pioneer in omnichannel retail and technology integration.',
        investment_style: ['Tech-Enabled', 'Omnichannel', 'Customer Experience']
      },
      'Vineeta Singh': {
        expertise: ['Beauty & Personal Care', 'D2C', 'Consumer Brands', 'Digital Marketing'],
        bio: 'Co-founder & CEO of SUGAR Cosmetics, expert in beauty and personal care industry.',
        investment_style: ['Brand Differentiation', 'Digital First', 'Consumer Behavior']
      },
      'Anupam Mittal': {
        expertise: ['Internet', 'Technology', 'Real Estate', 'Consumer Internet'],
        bio: 'Founder & CEO of Shaadi.com, veteran internet entrepreneur and investor.',
        investment_style: ['Internet Business', 'Network Effects', 'Platform Thinking']
      },
      'Ghazal Alagh': {
        expertise: ['FMCG', 'Baby Care', 'Consumer Products', 'D2C'],
        bio: 'Co-founder of Mamaearth, expert in natural and organic consumer products.',
        investment_style: ['Natural Products', 'Sustainability', 'Parent-focused']
      },
      'Ritesh Agarwal': {
        expertise: ['Hospitality', 'Technology', 'Travel', 'Real Estate'],
        bio: 'Founder & CEO of OYO, youngest entrepreneur to build a global hospitality brand.',
        investment_style: ['Asset Light', 'Technology Platform', 'Global Scalability']
      }
    };

    const allSharks = Object.keys(sharkProfiles);
    
    this.sharks = allSharks.map((name, index) => {
      const sharkDeals = this.deals.filter(deal => 
        deal.invested_sharks.includes(name) || deal.interested_sharks.includes(name)
      );

      const investedDeals = this.deals.filter(deal => deal.invested_sharks.includes(name));
      const totalInvestment = investedDeals.reduce((sum, deal) => 
        sum + (deal.deal_amount || 0), 0
      );

      const successfulDeals = investedDeals.filter(deal => deal.success_status === 'funded');
      const profile = sharkProfiles[name as keyof typeof sharkProfiles];

      return {
        id: `shark-${index + 1}`,
        name,
        total_deals: investedDeals.length,
        total_investment: totalInvestment,
        appearances: [...new Set(sharkDeals.map(deal => deal.season))],
        profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`,
        expertise: profile.expertise,
        bio: profile.bio,
        investment_style: profile.investment_style,
        success_rate: investedDeals.length > 0 ? (successfulDeals.length / investedDeals.length) * 100 : 0,
        avg_deal_size: investedDeals.length > 0 ? totalInvestment / investedDeals.length : 0,
        preferred_industries: this.getPreferredIndustries(investedDeals),
        created_at: new Date().toISOString(),
      };
    }).filter(shark => shark.total_deals > 0 || shark.name in sharkProfiles);
  }

  private getPreferredIndustries(deals: DealData[]): string[] {
    const industries = deals.map(deal => deal.industry);
    const counts = industries.reduce((acc, industry) => {
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([industry]) => industry);
  }

  private generateSampleData(): void {
    // Generate comprehensive sample data
    const industries = [
      'Technology', 'Food & Beverage', 'Healthcare', 'E-commerce', 
      'Education', 'Manufacturing', 'Fashion', 'Beauty & Personal Care'
    ];
    
    const sharks = [
      'Ashneer Grover', 'Namita Thapar', 'Aman Gupta', 'Peyush Bansal',
      'Vineeta Singh', 'Anupam Mittal', 'Ghazal Alagh', 'Ritesh Agarwal'
    ];

    this.deals = Array.from({ length: 200 }, (_, i) => {
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const askAmount = (Math.floor(Math.random() * 50) + 10) * 100000;
      const askEquity = Math.floor(Math.random() * 20) + 5;
      const valuation = (askAmount / askEquity) * 100;
      const hasDeal = Math.random() > 0.35;
      const dealAmount = hasDeal ? (Math.floor(Math.random() * 30) + 5) * 100000 : null;
      const dealEquity = hasDeal ? Math.floor(Math.random() * 15) + 5 : null;
      
      const interestedSharks = sharks.slice(0, Math.floor(Math.random() * 3) + 1);
      const investedSharks = hasDeal ? interestedSharks.slice(0, Math.floor(Math.random() * 2) + 1) : [];

      return {
        id: i + 1,
        season: Math.floor(Math.random() * 4) + 1,
        episode: Math.floor(Math.random() * 20) + 1,
        startup_name: `${industry} Startup ${i + 1}`,
        industry,
        ask_amount: askAmount,
        ask_equity: askEquity,
        valuation,
        deal_amount: dealAmount,
        deal_equity: dealEquity,
        deal_debt: 0,
        multiple_sharks: investedSharks.length > 1,
        interested_sharks: interestedSharks,
        invested_sharks: investedSharks,
        success_status: hasDeal ? 'funded' : 'not_funded',
        revenue_current: Math.floor(Math.random() * 10000000),
        revenue_projected: Math.floor(Math.random() * 50000000),
        profit_margin: Math.floor(Math.random() * 30),
        team_size: Math.floor(Math.random() * 20) + 1,
        founded_year: 2018 + Math.floor(Math.random() * 6),
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'][Math.floor(Math.random() * 5)],
        patent_status: ['Filed', 'Granted', 'None'][Math.floor(Math.random() * 3)],
        created_at: new Date().toISOString(),
      };
    });

    this.generateSharksData();
  }

  private parseString(value: any): string {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  }

  private parseNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    
    // Handle string numbers with commas, currency symbols, etc.
    if (typeof value === 'string') {
      const cleaned = value.replace(/[₹$,\s]/g, '');
      const num = Number(cleaned);
      return isNaN(num) ? null : num;
    }
    
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
    }
    return Boolean(value);
  }

  // Public methods
  getDeals(): DealData[] {
    return this.deals;
  }

  getSharks(): SharkData[] {
    return this.sharks;
  }

  getDealsByIndustry(industry: string): DealData[] {
    return this.deals.filter(deal => deal.industry === industry);
  }

  getDealsBySeason(season: number): DealData[] {
    return this.deals.filter(deal => deal.season === season);
  }

  getSharkByName(name: string): SharkData | undefined {
    return this.sharks.find(shark => shark.name === name);
  }

  getIndustries(): string[] {
    return [...new Set(this.deals.map(deal => deal.industry))];
  }

  getSeasons(): number[] {
    return [...new Set(this.deals.map(deal => deal.season))].sort();
  }

  getAnalytics() {
    const totalDeals = this.deals.length;
    const fundedDeals = this.deals.filter(deal => deal.success_status === 'funded');
    const totalInvestment = this.deals.reduce((sum, deal) => sum + (deal.deal_amount || 0), 0);
    const avgValuation = this.deals.reduce((sum, deal) => sum + deal.valuation, 0) / totalDeals;

    return {
      totalDeals,
      fundedDeals: fundedDeals.length,
      successRate: (fundedDeals.length / totalDeals) * 100,
      totalInvestment,
      avgValuation,
      avgDealSize: totalInvestment / fundedDeals.length || 0,
      industriesCount: this.getIndustries().length,
      seasonsCount: this.getSeasons().length,
      sharksCount: this.sharks.length,
    };
  }

  getSharkComparison(shark1Name: string, shark2Name: string) {
    const shark1 = this.getSharkByName(shark1Name);
    const shark2 = this.getSharkByName(shark2Name);
    
    if (!shark1 || !shark2) return null;

    const shark1Deals = this.deals.filter(deal => deal.invested_sharks.includes(shark1Name));
    const shark2Deals = this.deals.filter(deal => deal.invested_sharks.includes(shark2Name));

    return {
      shark1: {
        ...shark1,
        deals: shark1Deals,
        avgInvestment: shark1.total_investment / shark1.total_deals || 0,
        topIndustries: this.getTopIndustries(shark1Deals),
      },
      shark2: {
        ...shark2,
        deals: shark2Deals,
        avgInvestment: shark2.total_investment / shark2.total_deals || 0,
        topIndustries: this.getTopIndustries(shark2Deals),
      },
      commonIndustries: this.getCommonIndustries(shark1Deals, shark2Deals),
    };
  }

  private getTopIndustries(deals: DealData[]): Array<{industry: string, count: number}> {
    const industries = deals.reduce((acc, deal) => {
      acc[deal.industry] = (acc[deal.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(industries)
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }

  private getCommonIndustries(deals1: DealData[], deals2: DealData[]): string[] {
    const industries1 = new Set(deals1.map(deal => deal.industry));
    const industries2 = new Set(deals2.map(deal => deal.industry));
    
    return Array.from(industries1).filter(industry => industries2.has(industry));
  }
}

export const csvParser = CSVDataParser.getInstance();