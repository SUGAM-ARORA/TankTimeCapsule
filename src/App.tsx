import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FloatingNavigation } from './components/FloatingNavigation';
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
import { LoadingScreen } from './components/LoadingScreen';
import { useThemeStore } from './store/useThemeStore';
import { useDealsStore } from './store/useDealsStore';
import { useAuthStore } from './store/useAuthStore';
import { motion } from 'framer-motion';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isDarkMode } = useThemeStore();
  const { fetchDeals, fetchSharks, fetchPredictions, fetchInsights } = useDealsStore();
  const { initialize, initialized } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initialize();
        await Promise.all([
          fetchDeals(),
          fetchSharks(),
          fetchPredictions(),
          fetchInsights(),
        ]);
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();
  }, [initialize, fetchDeals, fetchSharks, fetchPredictions, fetchInsights]);

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}>
        {/* Optimized Background Elements - Reduced for mobile performance */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute -top-40 -right-40 w-72 h-72 md:w-96 md:h-96 rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-r from-blue-200/40 to-purple-200/40'
            } blur-3xl`}
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute -bottom-40 -left-40 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-r from-purple-200/40 to-pink-200/40'
            } blur-3xl`}
          />
        </div>

        <Navbar toggleNav={toggleNav} />
        
        {/* Revolutionary Floating Navigation */}
        <FloatingNavigation isOpen={isNavOpen} onClose={closeNav} />
        
        <motion.main 
          className="pt-16 md:pt-20 relative z-10"
          layout
        >
          <div className="p-3 md:p-6">
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
        </motion.main>
      </div>
    </Router>
  );
}

export default App;