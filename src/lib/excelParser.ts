import * as XLSX from 'xlsx';

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
}

export class ExcelDataParser {
  private static instance: ExcelDataParser;
  private deals: DealData[] = [];
  private sharks: SharkData[] = [];
  private isLoaded = false;

  static getInstance(): ExcelDataParser {
    if (!ExcelDataParser.instance) {
      ExcelDataParser.instance = new ExcelDataParser();
    }
    return ExcelDataParser.instance;
  }

  async loadExcelData(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Load the Excel file from the data directory
      const response = await fetch('/data/Shark Tank India.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Get the first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert to JSON
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Parse the data
      this.parseDealsData(rawData);
      this.generateSharksData();
      
      this.isLoaded = true;
      console.log('Excel data loaded successfully:', {
        deals: this.deals.length,
        sharks: this.sharks.length
      });
    } catch (error) {
      console.error('Error loading Excel data:', error);
      // Fallback to sample data
      this.generateSampleData();
      this.isLoaded = true;
    }
  }

  private parseDealsData(rawData: any[][]): void {
    if (rawData.length < 2) return;

    const headers = rawData[0];
    const dataRows = rawData.slice(1);

    this.deals = dataRows.map((row, index) => {
      const deal: DealData = {
        id: index + 1,
        season: this.parseNumber(row[0]) || 1,
        episode: this.parseNumber(row[1]) || 1,
        startup_name: this.parseString(row[2]) || `Startup ${index + 1}`,
        industry: this.parseString(row[3]) || 'Technology',
        ask_amount: this.parseNumber(row[4]) || 1000000,
        ask_equity: this.parseNumber(row[5]) || 10,
        valuation: this.parseNumber(row[6]) || 10000000,
        deal_amount: this.parseNumber(row[7]) || null,
        deal_equity: this.parseNumber(row[8]) || null,
        deal_debt: this.parseNumber(row[9]) || 0,
        multiple_sharks: this.parseBoolean(row[10]) || false,
        interested_sharks: this.parseArray(row[11]) || [],
        invested_sharks: this.parseArray(row[12]) || [],
        success_status: this.parseString(row[13]) || 'pending',
        pitch_description: this.parseString(row[14]) || '',
        revenue_current: this.parseNumber(row[15]) || 0,
        revenue_projected: this.parseNumber(row[16]) || 0,
        profit_margin: this.parseNumber(row[17]) || 0,
        team_size: this.parseNumber(row[18]) || 1,
        founded_year: this.parseNumber(row[19]) || 2020,
        location: this.parseString(row[20]) || 'India',
        patent_status: this.parseString(row[21]) || 'None',
        created_at: new Date().toISOString(),
      };

      return deal;
    }).filter(deal => deal.startup_name && deal.startup_name !== '');
  }

  private generateSharksData(): void {
    const sharkNames = [
      'Ashneer Grover',
      'Namita Thapar',
      'Aman Gupta',
      'Peyush Bansal',
      'Vineeta Singh',
      'Anupam Mittal',
      'Ghazal Alagh',
      'Ritesh Agarwal'
    ];

    this.sharks = sharkNames.map((name, index) => {
      const sharkDeals = this.deals.filter(deal => 
        deal.invested_sharks.includes(name) || deal.interested_sharks.includes(name)
      );

      const totalInvestment = sharkDeals.reduce((sum, deal) => 
        sum + (deal.deal_amount || 0), 0
      );

      const successfulDeals = sharkDeals.filter(deal => deal.success_status === 'funded');

      return {
        id: `shark-${index + 1}`,
        name,
        total_deals: sharkDeals.length,
        total_investment: totalInvestment,
        appearances: [...new Set(sharkDeals.map(deal => deal.season))],
        profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`,
        expertise: this.getSharkExpertise(name),
        success_rate: sharkDeals.length > 0 ? (successfulDeals.length / sharkDeals.length) * 100 : 0,
        avg_deal_size: sharkDeals.length > 0 ? totalInvestment / sharkDeals.length : 0,
        preferred_industries: this.getPreferredIndustries(sharkDeals),
        created_at: new Date().toISOString(),
      };
    });
  }

  private getSharkExpertise(name: string): string[] {
    const expertise: Record<string, string[]> = {
      'Ashneer Grover': ['Fintech', 'Banking', 'Digital Payments', 'Technology'],
      'Namita Thapar': ['Healthcare', 'Pharmaceuticals', 'Consumer Goods', 'Manufacturing'],
      'Aman Gupta': ['Consumer Electronics', 'D2C Brands', 'Marketing', 'E-commerce'],
      'Peyush Bansal': ['E-commerce', 'Technology', 'Retail', 'Consumer Products'],
      'Vineeta Singh': ['Beauty & Personal Care', 'D2C', 'Consumer Brands', 'Digital Marketing'],
      'Anupam Mittal': ['Internet', 'Technology', 'Real Estate', 'Consumer Internet'],
      'Ghazal Alagh': ['FMCG', 'Baby Care', 'Consumer Products', 'D2C'],
      'Ritesh Agarwal': ['Hospitality', 'Technology', 'Travel', 'Real Estate']
    };
    return expertise[name] || ['Business', 'Investment', 'Strategy'];
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
    // Generate sample data if Excel loading fails
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
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    return Boolean(value);
  }

  private parseArray(value: any): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(',').map(s => s.trim()).filter(s => s);
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
}

export const excelParser = ExcelDataParser.getInstance();