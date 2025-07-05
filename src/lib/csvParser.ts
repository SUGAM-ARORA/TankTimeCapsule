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
  created_at: string;
  bio?: string;
  company?: string;
  net_worth?: string;
  investment_style?: string[];
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
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '_'),
        transform: (value) => value.trim()
      });
      
      if (result.errors.length > 0) {
        console.warn('CSV parsing warnings:', result.errors);
      }
      
      // Parse the data
      this.parseDealsData(result.data);
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
    this.deals = rawData.map((row, index) => {
      // Handle different possible column names from CSV
      const deal: DealData = {
        id: index + 1,
        season: this.parseNumber(row.season || row.s_no || row.series) || 1,
        episode: this.parseNumber(row.episode || row.ep_no) || 1,
        startup_name: this.parseString(row.startup_name || row.company_name || row.brand || row.startup) || `Startup ${index + 1}`,
        industry: this.parseString(row.industry || row.sector || row.category) || 'Technology',
        ask_amount: this.parseNumber(row.ask_amount || row.amount_asked || row.ask) || 1000000,
        ask_equity: this.parseNumber(row.ask_equity || row.equity_asked || row.equity) || 10,
        valuation: this.parseNumber(row.valuation || row.company_valuation) || 10000000,
        deal_amount: this.parseNumber(row.deal_amount || row.amount_invested || row.investment) || null,
        deal_equity: this.parseNumber(row.deal_equity || row.equity_given || row.final_equity) || null,
        deal_debt: this.parseNumber(row.deal_debt || row.debt) || 0,
        multiple_sharks: this.parseBoolean(row.multiple_sharks || row.joint_deal) || false,
        interested_sharks: this.parseSharkArray(row.interested_sharks || row.sharks_interested || ''),
        invested_sharks: this.parseSharkArray(row.invested_sharks || row.sharks_invested || row.investors || ''),
        success_status: this.parseString(row.success_status || row.deal_status || row.status) || 'pending',
        pitch_description: this.parseString(row.pitch_description || row.description || row.about) || '',
        revenue_current: this.parseNumber(row.revenue_current || row.current_revenue || row.revenue) || 0,
        revenue_projected: this.parseNumber(row.revenue_projected || row.projected_revenue) || 0,
        profit_margin: this.parseNumber(row.profit_margin || row.margin) || 0,
        team_size: this.parseNumber(row.team_size || row.employees) || 1,
        founded_year: this.parseNumber(row.founded_year || row.year_founded) || 2020,
        location: this.parseString(row.location || row.city || row.state) || 'India',
        patent_status: this.parseString(row.patent_status || row.patents) || 'None',
        created_at: new Date().toISOString(),
      };

      return deal;
    }).filter(deal => deal.startup_name && deal.startup_name !== '');
  }

  private generateSharksData(): void {
    // Get all unique sharks from the deals data
    const sharkNames = new Set<string>();
    
    this.deals.forEach(deal => {
      deal.invested_sharks.forEach(shark => {
        if (shark && shark.trim()) {
          sharkNames.add(shark.trim());
        }
      });
      deal.interested_sharks.forEach(shark => {
        if (shark && shark.trim()) {
          sharkNames.add(shark.trim());
        }
      });
    });

    // Add known sharks if not present
    const knownSharks = [
      'Ashneer Grover',
      'Namita Thapar',
      'Aman Gupta',
      'Peyush Bansal',
      'Vineeta Singh',
      'Anupam Mittal',
      'Ghazal Alagh',
      'Ritesh Agarwal'
    ];

    knownSharks.forEach(shark => sharkNames.add(shark));

    this.sharks = Array.from(sharkNames).map((name, index) => {
      const sharkDeals = this.deals.filter(deal => 
        deal.invested_sharks.includes(name) || deal.interested_sharks.includes(name)
      );

      const investedDeals = this.deals.filter(deal => deal.invested_sharks.includes(name));
      const totalInvestment = investedDeals.reduce((sum, deal) => 
        sum + (deal.deal_amount || 0), 0
      );

      const successfulDeals = investedDeals.filter(deal => deal.success_status === 'funded' || deal.success_status === 'deal');

      return {
        id: `shark-${index + 1}`,
        name,
        total_deals: investedDeals.length,
        total_investment: totalInvestment,
        appearances: [...new Set(sharkDeals.map(deal => deal.season))],
        profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e40af&color=ffffff&size=200&bold=true`,
        expertise: this.getSharkExpertise(name),
        success_rate: investedDeals.length > 0 ? (successfulDeals.length / investedDeals.length) * 100 : 0,
        avg_deal_size: investedDeals.length > 0 ? totalInvestment / investedDeals.length : 0,
        preferred_industries: this.getPreferredIndustries(investedDeals),
        created_at: new Date().toISOString(),
        bio: this.getSharkBio(name),
        company: this.getSharkCompany(name),
        net_worth: this.getSharkNetWorth(name),
        investment_style: this.getInvestmentStyle(name),
      };
    }).filter(shark => shark.name && shark.name !== '');
  }

  private getSharkExpertise(name: string): string[] {
    const expertise: Record<string, string[]> = {
      'Ashneer Grover': ['Fintech', 'Banking', 'Digital Payments', 'Technology', 'Aggressive Deals'],
      'Namita Thapar': ['Healthcare', 'Pharmaceuticals', 'Consumer Goods', 'Manufacturing', 'Life Sciences'],
      'Aman Gupta': ['Consumer Electronics', 'D2C Brands', 'Marketing', 'E-commerce', 'Audio Technology'],
      'Peyush Bansal': ['E-commerce', 'Technology', 'Retail', 'Consumer Products', 'Eyewear'],
      'Vineeta Singh': ['Beauty & Personal Care', 'D2C', 'Consumer Brands', 'Digital Marketing', 'Cosmetics'],
      'Anupam Mittal': ['Internet', 'Technology', 'Real Estate', 'Consumer Internet', 'Matrimony'],
      'Ghazal Alagh': ['FMCG', 'Baby Care', 'Consumer Products', 'D2C', 'Natural Products'],
      'Ritesh Agarwal': ['Hospitality', 'Technology', 'Travel', 'Real Estate', 'Accommodation']
    };
    return expertise[name] || ['Business', 'Investment', 'Strategy'];
  }

  private getSharkBio(name: string): string {
    const bios: Record<string, string> = {
      'Ashneer Grover': 'Former MD & Co-founder of BharatPe, known for aggressive deal-making and fintech expertise.',
      'Namita Thapar': 'Executive Director of Emcure Pharmaceuticals, healthcare industry veteran.',
      'Aman Gupta': 'Co-founder & CMO of boAt, leading consumer electronics brand in India.',
      'Peyush Bansal': 'Founder & CEO of Lenskart, revolutionizing eyewear retail in India.',
      'Vineeta Singh': 'CEO & Co-founder of SUGAR Cosmetics, beauty industry pioneer.',
      'Anupam Mittal': 'Founder & CEO of Shaadi.com, internet entrepreneur and investor.',
      'Ghazal Alagh': 'Co-founder of Mamaearth, natural baby care products expert.',
      'Ritesh Agarwal': 'Founder & CEO of OYO, hospitality industry disruptor.'
    };
    return bios[name] || 'Experienced business leader and investor.';
  }

  private getSharkCompany(name: string): string {
    const companies: Record<string, string> = {
      'Ashneer Grover': 'BharatPe (Former)',
      'Namita Thapar': 'Emcure Pharmaceuticals',
      'Aman Gupta': 'boAt',
      'Peyush Bansal': 'Lenskart',
      'Vineeta Singh': 'SUGAR Cosmetics',
      'Anupam Mittal': 'Shaadi.com',
      'Ghazal Alagh': 'Mamaearth',
      'Ritesh Agarwal': 'OYO'
    };
    return companies[name] || 'Various Ventures';
  }

  private getSharkNetWorth(name: string): string {
    const netWorths: Record<string, string> = {
      'Ashneer Grover': '₹700 Cr',
      'Namita Thapar': '₹600 Cr',
      'Aman Gupta': '₹500 Cr',
      'Peyush Bansal': '₹1,500 Cr',
      'Vineeta Singh': '₹300 Cr',
      'Anupam Mittal': '₹250 Cr',
      'Ghazal Alagh': '₹400 Cr',
      'Ritesh Agarwal': '₹1,200 Cr'
    };
    return netWorths[name] || '₹100+ Cr';
  }

  private getInvestmentStyle(name: string): string[] {
    const styles: Record<string, string[]> = {
      'Ashneer Grover': ['Aggressive', 'High-Risk High-Reward', 'Scalable Business Models'],
      'Namita Thapar': ['Conservative', 'Healthcare Focus', 'Long-term Growth'],
      'Aman Gupta': ['Brand Building', 'Consumer-Centric', 'Marketing Driven'],
      'Peyush Bansal': ['Technology-First', 'Customer Experience', 'Omnichannel'],
      'Vineeta Singh': ['D2C Expertise', 'Brand Strategy', 'Digital Marketing'],
      'Anupam Mittal': ['Internet Business', 'Platform Models', 'Network Effects'],
      'Ghazal Alagh': ['Natural Products', 'Sustainable Business', 'Mother-Child Segment'],
      'Ritesh Agarwal': ['Asset-Light Models', 'Technology Platform', 'Hospitality']
    };
    return styles[name] || ['Strategic', 'Growth-Oriented', 'Value Creation'];
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
    // Generate sample data if CSV loading fails
    this.deals = Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      season: Math.floor(Math.random() * 4) + 1,
      episode: Math.floor(Math.random() * 20) + 1,
      startup_name: `Startup ${i + 1}`,
      industry: ['Technology', 'Food & Beverage', 'Healthcare', 'E-commerce', 'Education'][Math.floor(Math.random() * 5)],
      ask_amount: (Math.floor(Math.random() * 50) + 10) * 100000,
      ask_equity: Math.floor(Math.random() * 20) + 5,
      valuation: (Math.floor(Math.random() * 100) + 10) * 1000000,
      deal_amount: Math.random() > 0.3 ? (Math.floor(Math.random() * 30) + 5) * 100000 : null,
      deal_equity: Math.random() > 0.3 ? Math.floor(Math.random() * 15) + 5 : null,
      deal_debt: 0,
      multiple_sharks: Math.random() > 0.7,
      interested_sharks: ['Ashneer Grover', 'Namita Thapar'].slice(0, Math.floor(Math.random() * 2) + 1),
      invested_sharks: Math.random() > 0.3 ? ['Ashneer Grover'] : [],
      success_status: Math.random() > 0.3 ? 'funded' : 'not_funded',
      created_at: new Date().toISOString(),
    }));

    this.generateSharksData();
  }

  private parseString(value: any): string {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  }

  private parseNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    // Handle Indian number format (lakhs, crores)
    const str = String(value).toLowerCase().replace(/[,\s]/g, '');
    
    if (str.includes('crore') || str.includes('cr')) {
      const num = parseFloat(str.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? null : num * 10000000; // 1 crore = 10 million
    }
    
    if (str.includes('lakh') || str.includes('l')) {
      const num = parseFloat(str.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? null : num * 100000; // 1 lakh = 100 thousand
    }
    
    const num = parseFloat(str);
    return isNaN(num) ? null : num;
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const lower = value.toLowerCase();
      return lower === 'true' || lower === 'yes' || lower === '1' || lower === 'y';
    }
    return Boolean(value);
  }

  private parseSharkArray(value: any): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(/[,;|&]/)
        .map(s => s.trim())
        .filter(s => s && s !== 'None' && s !== 'N/A');
    }
    return [];
  }

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
    const fundedDeals = this.deals.filter(deal => 
      deal.success_status === 'funded' || 
      deal.success_status === 'deal' || 
      deal.deal_amount !== null
    );
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
}

export const csvParser = CSVDataParser.getInstance();