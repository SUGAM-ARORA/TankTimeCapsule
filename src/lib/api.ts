import { supabase } from './supabase';

// This file is kept for backward compatibility
// All API calls now go through Supabase

export const api = {
  get: async (url: string) => {
    // Placeholder for any additional API calls
    throw new Error('Use Supabase client directly');
  },
  post: async (url: string, data: any) => {
    // Placeholder for any additional API calls
    throw new Error('Use Supabase client directly');
  },
};

// Legacy functions for backward compatibility
export const fetchDeals = async () => {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchSharks = async () => {
  const { data, error } = await supabase
    .from('sharks')
    .select('*')
    .order('total_investment', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchAnalytics = async () => {
  // Return sample analytics data
  return {
    total_deals: 150,
    total_investment: 500000000,
    success_rate: 0.65,
    avg_valuation: 25000000,
  };
};

export const fetchPredictions = async () => {
  // Return sample predictions data
  return [
    {
      id: 1,
      startup_type: "Technology",
      success_probability: 0.75,
      recommended_sharks: ["Ashneer Grover", "Peyush Bansal"],
      risk_factors: ["Market Competition", "Tech Adoption"],
    },
  ];
};