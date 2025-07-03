import React, { useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  PieChart, 
  Table, 
  Activity,
  Lightbulb,
  LineChart,
  Building2,
  Factory,
  GitCompare,
  X,
  Sparkles,
  Zap,
  Brain,
  Target,
  Eye,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';

interface FloatingNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useThemeStore();
  const location = useLocation();

  const menuItems = useMemo(() => [
    { 
      icon: BarChart2, 
      label: 'Dashboard', 
      path: '/', 
      color: 'from-blue-500 to-cyan-500',
      description: 'Overview & Analytics'
    },
    { 
      icon: Users, 
      label: 'Sharks', 
      path: '/sharks', 
      color: 'from-purple-500 to-pink-500',
      description: 'Investor Profiles'
    },
    { 
      icon: TrendingUp, 
      label: 'Deals', 
      path: '/deals', 
      color: 'from-green-500 to-emerald-500',
      description: 'Investment Deals'
    },
    { 
      icon: PieChart, 
      label: 'Analytics', 
      path: '/analytics', 
      color: 'from-orange-500 to-red-500',
      description: 'Deep Insights'
    },
    { 
      icon: Table, 
      label: 'Deal Table', 
      path: '/deal-table', 
      color: 'from-indigo-500 to-purple-500',
      description: 'Data Explorer'
    },
    { 
      icon: Brain, 
      label: 'AI Predictions', 
      path: '/predictions', 
      color: 'from-pink-500 to-rose-500',
      description: 'ML Insights',
      premium: true
    },
    { 
      icon: Eye, 
      label: 'Market Insights', 
      path: '/insights', 
      color: 'from-yellow-500 to-orange-500',
      description: 'Market Intelligence'
    },
    { 
      icon: LineChart, 
      label: 'Trends', 
      path: '/trends', 
      color: 'from-teal-500 to-cyan-500',
      description: 'Investment Trends'
    },
    { 
      icon: Building2, 
      label: 'Startups', 
      path: '/startups', 
      color: 'from-violet-500 to-purple-500',
      description: 'Startup Analysis'
    },
    { 
      icon: Factory, 
      label: 'Industries', 
      path: '/industries', 
      color: 'from-emerald-500 to-teal-500',
      description: 'Sector Analysis'
    },
    { 
      icon: GitCompare, 
      label: 'Comparisons', 
      path: '/comparisons', 
      color: 'from-blue-500 to-indigo-500',
      description: 'Compare Sharks'
    },
  ], []);

  // Optimized animation variants with reduced complexity for mobile
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      scale: 0.95,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  }), []);

  const handleItemClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Floating Navigation Panel - Responsive */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-4 sm:inset-8 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-50 
              w-auto md:w-[90vw] md:max-w-6xl h-auto md:h-[80vh] 
              rounded-2xl md:rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-700/50' 
                : 'bg-white/95 border-gray-200/50'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-8 border-b border-gray-200/20">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Rocket className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Navigation Hub
                  </h2>
                  <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Explore Tank Time Capsule
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-slate-700/50 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </motion.button>
            </div>

            {/* Navigation Grid - Responsive */}
            <div className="p-4 md:p-8 h-full overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={handleItemClick}
                        className={`group block p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? isDarkMode
                              ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                              : 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                            : isDarkMode
                              ? 'bg-slate-800/40 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50'
                              : 'bg-white/60 hover:bg-white/80 border border-gray-200/50 hover:border-gray-300/50'
                        } backdrop-blur-xl shadow-xl hover:shadow-2xl`}
                      >
                        {/* Premium Badge */}
                        {item.premium && (
                          <div className="absolute top-2 right-2 md:top-4 md:right-4">
                            <div className="flex items-center space-x-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                              <Sparkles className="h-2 w-2 md:h-3 md:w-3 text-white" />
                              <span className="text-xs font-semibold text-white">PRO</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Icon */}
                        <div className={`relative mb-3 md:mb-4 p-2 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}>
                          <item.icon className="h-5 w-5 md:h-8 md:w-8 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className={`text-base md:text-xl font-bold mb-1 md:mb-2 ${
                            isActive 
                              ? 'text-blue-500' 
                              : isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'
                          } transition-colors duration-300`}>
                            {item.label}
                          </h3>
                          <p className={`text-xs md:text-sm ${
                            isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                          } transition-colors duration-300`}>
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl md:rounded-b-3xl"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Quick Stats - Mobile Optimized */}
              <motion.div
                variants={itemVariants}
                className={`mt-4 md:mt-8 p-4 md:p-6 rounded-2xl md:rounded-3xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30' 
                    : 'bg-gradient-to-r from-white/60 to-gray-50/60 border border-gray-200/50'
                } backdrop-blur-xl`}
              >
                <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 flex items-center">
                  <Target className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-blue-500">150+</div>
                    <div className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Deals</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-green-500">68%</div>
                    <div className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-purple-500">₹500Cr+</div>
                    <div className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Investment</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};