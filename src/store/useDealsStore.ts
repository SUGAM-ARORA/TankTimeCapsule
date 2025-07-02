import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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

interface DealsStore {
  deals: Deal[];
  sharks: Shark[];
  selectedSeason: number;
  loading: boolean;
  error: string | null;
  predictions: any[];
  insights: any[];
  fetchDeals: () => Promise<void>;
  fetchSharks: () => Promise<void>;
  fetchPredictions: () => Promise<void>;
  fetchInsights: () => Promise<void>;
  setSelectedSeason: (season: number) => void;
}

// Sample data for development
const sampleDeals: Deal[] = [
  {
    id: 1,
    season: 1,
    episode: 1,
    startup_name: "BluePine Foods",
    industry: "Food & Beverage",
    ask_amount: 50000000,
    ask_equity: 2.5,
    valuation: 2000000000,
    deal_amount: 50000000,
    deal_equity: 3,
    deal_debt: 0,
    multiple_sharks: true,
    interested_sharks: ["Ashneer Grover", "Namita Thapar"],
    invested_sharks: ["Ashneer Grover"],
    success_status: "funded",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    season: 1,
    episode: 2,
    startup_name: "TechInnovate",
    industry: "Technology",
    ask_amount: 100000000,
    ask_equity: 5,
    valuation: 2000000000,
    deal_amount: 100000000,
    deal_equity: 6,
    deal_debt: 0,
    multiple_sharks: false,
    interested_sharks: ["Peyush Bansal"],
    invested_sharks: ["Peyush Bansal"],
    success_status: "funded",
    created_at: new Date().toISOString(),
  },
];

const sampleSharks: Shark[] = [
  {
    id: "1",
    name: "Ashneer Grover",
    total_deals: 24,
    total_investment: 118000000,
    appearances: [1, 2],
    profile_image: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Namita Thapar",
    total_deals: 28,
    total_investment: 125000000,
    appearances: [1, 2, 3],
    profile_image: "",
    created_at: new Date().toISOString(),
  },
];

const samplePredictions = [
  {
    id: 1,
    startup_type: "Technology",
    success_probability: 0.75,
    recommended_sharks: ["Ashneer Grover", "Peyush Bansal"],
    risk_factors: ["Market Competition", "Tech Adoption"],
  },
  {
    id: 2,
    startup_type: "Healthcare",
    success_probability: 0.82,
    recommended_sharks: ["Namita Thapar", "Vineeta Singh"],
    risk_factors: ["Regulatory Compliance", "Market Access"],
  },
];

const sampleInsights = [
  {
    id: 1,
    title: "AI Startup Trends",
    description: "Analysis of AI and ML startup performance in recent seasons",
    data_points: {
      ai_startups: 15,
      success_rate: 0.8,
      avg_valuation: 50000000,
    },
  },
];

export const useDealsStore = create<DealsStore>((set, get) => ({
  deals: sampleDeals,
  sharks: sampleSharks,
  selectedSeason: 1,
  loading: false,
  error: null,
  predictions: samplePredictions,
  insights: sampleInsights,

  fetchDeals: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Use sample data if no data in database
      set({ deals: data && data.length > 0 ? data : sampleDeals });
    } catch (error) {
      console.error('Error fetching deals:', error);
      set({ error: (error as Error).message, deals: sampleDeals });
    } finally {
      set({ loading: false });
    }
  },

  fetchSharks: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('sharks')
        .select('*')
        .order('total_investment', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Use sample data if no data in database
      set({ sharks: data && data.length > 0 ? data : sampleSharks });
    } catch (error) {
      console.error('Error fetching sharks:', error);
      set({ error: (error as Error).message, sharks: sampleSharks });
    } finally {
      set({ loading: false });
    }
  },

  fetchPredictions: async () => {
    try {
      // For now, use sample data
      set({ predictions: samplePredictions });
    } catch (error) {
      console.error('Error fetching predictions:', error);
      set({ error: (error as Error).message });
    }
  },

  fetchInsights: async () => {
    try {
      // For now, use sample data
      set({ insights: sampleInsights });
    } catch (error) {
      console.error('Error fetching insights:', error);
      set({ error: (error as Error).message });
    }
  },

  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));