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
import { LoadingScreen } from './components/LoadingScreen';
import { useThemeStore } from './store/useThemeStore';
import { useDealsStore } from './store/useDealsStore';
import { useAuthStore } from './store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
              isDarkMode ? 'bg-blue-500/10' : 'bg-blue-200/30'
            } blur-3xl`}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
              isDarkMode ? 'bg-purple-500/10' : 'bg-purple-200/30'
            } blur-3xl`}
          />
        </div>

        <Navbar toggleSidebar={toggleSidebar} />
        
        <AnimatePresence>
          {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
        </AnimatePresence>
        
        <motion.main 
          className={`pt-20 transition-all duration-300 ${
            isSidebarOpen ? 'ml-72' : 'ml-0'
          }`}
          layout
        >
          <div className="p-6 relative z-10">
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