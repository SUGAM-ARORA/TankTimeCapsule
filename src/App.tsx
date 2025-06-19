import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Sharks } from './pages/Sharks';
import { Deals } from './pages/Deals';
import { Analytics } from './pages/Analytics';
import { DealTable } from './pages/DealTable';
import { Predictions } from './pages/Predictions';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Insights } from './pages/Insights';
import { Trends } from './pages/Trends';
import { Startups } from './pages/Startups';
import { Industries } from './pages/Industries';
import { Comparisons } from './pages/Comparisons';
import { useThemeStore } from './store/useThemeStore';
import { useDealsStore } from './store/useDealsStore';
import { useAuthStore } from './store/useAuthStore';
import { supabase } from './lib/supabase';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode } = useThemeStore();
  const { fetchDeals, fetchSharks, fetchPredictions, fetchInsights } = useDealsStore();
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchProfile();
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          // Clear user data
        }
      }
    );

    // Fetch initial data
    fetchDeals();
    fetchSharks();
    fetchPredictions();
    fetchInsights();

    return () => subscription.unsubscribe();
  }, [fetchDeals, fetchSharks, fetchPredictions, fetchInsights, fetchProfile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#F5F5F5] text-[#5D87FF]'
      }`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`pt-16 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sharks" element={<Sharks />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/deal-table" element={<DealTable />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/comparisons" element={<Comparisons />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<div>Settings Coming Soon</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;