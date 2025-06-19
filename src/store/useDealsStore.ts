import { create } from 'zustand';
import { fetchDeals, fetchSharks, fetchPredictions, fetchAnalytics } from '../lib/api';

interface Deal {
  id: number;
  season: number;
  episode: number;
  startup_name: string;
  industry: string;
  ask_amount: number;
  ask_equity: number;
  valuation: number;
  deal_amount: number;
  deal_equity: number;
  deal_debt: number;
  multiple_sharks: boolean;
  interested_sharks: string[];
  invested_sharks: string[];
  success_status: string;
  created_at: string;
}

interface Shark {
  id: string;
  name: string;
  total_deals: number;
  total_investment: number;
  appearances: number[];
  profile_image: string;
  created_at: string;
}

interface Prediction {
  id: string;
  startup_type: string;
  success_probability: number;
  recommended_sharks: string[];
  risk_factors: string[];
}

interface Insight {
  id: string;
  title: string;
  description: string;
  data_points: {
    ai_startups: number;
    success_rate: number;
    avg_valuation: number;
  };
}

interface DealsStore {
  deals: Deal[];
  sharks: Shark[];
  selectedSeason: number;
  loading: boolean;
  error: string | null;
  predictions: Prediction[];
  insights: Insight[];
  fetchDeals: () => Promise<void>;
  fetchSharks: () => Promise<void>;
  fetchPredictions: () => Promise<void>;
  fetchInsights: () => Promise<void>;
  setSelectedSeason: (season: number) => void;
}

// Dummy data for predictions and insights (since these tables might be empty initially)
const dummyPredictions: Prediction[] = [
  {
    id: '1',
    startup_type: 'AI/ML Technology',
    success_probability: 0.78,
    recommended_sharks: ['Ashneer Grover', 'Namita Thapar'],
    risk_factors: ['Market Competition', 'Tech Adoption'],
  },
  {
    id: '2',
    startup_type: 'D2C Food & Beverage',
    success_probability: 0.65,
    recommended_sharks: ['Aman Gupta', 'Vineeta Singh'],
    risk_factors: ['Supply Chain', 'Market Saturation'],
  },
];

const dummyInsights: Insight[] = [
  {
    id: '1',
    title: 'AI Startup Trends',
    description: 'Analysis of AI and ML startups in recent seasons',
    data_points: {
      ai_startups: 24,
      success_rate: 0.75,
      avg_valuation: 85000000,
    },
  },
  {
    id: '2',
    title: 'D2C Market Growth',
    description: 'Direct-to-consumer brands showing strong growth',
    data_points: {
      ai_startups: 18,
      success_rate: 0.68,
      avg_valuation: 45000000,
    },
  },
];

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  sharks: [],
  selectedSeason: 1,
  loading: false,
  error: null,
  predictions: dummyPredictions,
  insights: dummyInsights,

  fetchDeals: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchDeals();
      set({ deals: data });
    } catch (error) {
      console.error('Error fetching deals:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSharks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchSharks();
      set({ sharks: data });
    } catch (error) {
      console.error('Error fetching sharks:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchPredictions: async () => {
    try {
      const data = await fetchPredictions();
      if (data && data.length > 0) {
        set({ predictions: data });
      }
      // Keep dummy data if no real data is available
    } catch (error) {
      console.error('Error fetching predictions:', error);
      // Keep dummy data on error
    }
  },

  fetchInsights: async () => {
    try {
      const data = await fetchAnalytics();
      if (data) {
        // Transform analytics data into insights format if needed
        // For now, keep dummy insights
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
      // Keep dummy data on error
    }
  },

  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));