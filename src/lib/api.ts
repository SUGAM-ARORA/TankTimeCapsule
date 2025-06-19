import { supabase } from './supabase';

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred');
};

// Data endpoints using Supabase
export const fetchDeals = async () => {
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error);
    return data || [];
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
};

export const fetchSharks = async () => {
  try {
    const { data, error } = await supabase
      .from('sharks')
      .select('*')
      .order('name');

    if (error) handleSupabaseError(error);
    return data || [];
  } catch (error) {
    console.error('Error fetching sharks:', error);
    return [];
  }
};

export const fetchAnalytics = async () => {
  try {
    // Fetch basic analytics from deals table
    const { data: deals, error } = await supabase
      .from('deals')
      .select('*');

    if (error) handleSupabaseError(error);

    // Calculate analytics
    const totalDeals = deals?.length || 0;
    const totalInvestment = deals?.reduce((sum, deal) => sum + (deal.deal_amount || 0), 0) || 0;
    const avgValuation = deals?.reduce((sum, deal) => sum + (deal.valuation || 0), 0) / totalDeals || 0;
    const successRate = deals?.filter(deal => deal.success_status === 'funded').length / totalDeals * 100 || 0;

    return {
      overall: {
        total_deals: totalDeals,
        total_investment: totalInvestment,
        avg_valuation: avgValuation,
        success_rate: successRate,
      },
      industries: [], // Will be calculated from deals data
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      overall: {
        total_deals: 0,
        total_investment: 0,
        avg_valuation: 0,
        success_rate: 0,
      },
      industries: [],
    };
  }
};

export const fetchPredictions = async () => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) handleSupabaseError(error);
    return data || [];
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return [];
  }
};

// Auth functions are now handled directly in the auth store using Supabase
export const auth = {
  // These are now handled in useAuthStore
  login: () => Promise.reject('Use useAuthStore.signIn instead'),
  register: () => Promise.reject('Use useAuthStore.signUp instead'),
  logout: () => Promise.reject('Use useAuthStore.signOut instead'),
  getProfile: () => Promise.reject('Use useAuthStore.fetchProfile instead'),
  updateProfile: () => Promise.reject('Use useAuthStore.updateProfile instead'),
};