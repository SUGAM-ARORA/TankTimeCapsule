import React from 'react';
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

  const menuItems = [
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
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

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
          
          {/* Floating Navigation Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-6xl h-[80vh] rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}
            style={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200/20">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                >
                  <Rocket className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Navigation Hub
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Explore Tank Time Capsule
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-3 rounded-2xl transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-slate-700/50 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Navigation Grid */}
            <div className="p-8 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -10,
                        rotateY: 5,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`group block p-6 rounded-3xl transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? isDarkMode
                              ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                              : 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                            : isDarkMode
                              ? 'bg-slate-800/40 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50'
                              : 'bg-white/60 hover:bg-white/80 border border-gray-200/50 hover:border-gray-300/50'
                        } backdrop-blur-xl shadow-xl hover:shadow-2xl`}
                      >
                        {/* Background Gradient Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        {/* Premium Badge */}
                        {item.premium && (
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                              <Sparkles className="h-3 w-3 text-white" />
                              <span className="text-xs font-semibold text-white">PRO</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Icon */}
                        <div className={`relative mb-4 p-4 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <item.icon className="h-8 w-8 text-white" />
                          
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className={`text-xl font-bold mb-2 ${
                            isActive 
                              ? 'text-blue-500' 
                              : isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'
                          } transition-colors duration-300`}>
                            {item.label}
                          </h3>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                          } transition-colors duration-300`}>
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl"
                          />
                        )}
                        
                        {/* Hover Arrow */}
                        <motion.div
                          className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <Zap className={`h-5 w-5 ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className={`mt-8 p-6 rounded-3xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30' 
                    : 'bg-gradient-to-r from-white/60 to-gray-50/60 border border-gray-200/50'
                } backdrop-blur-xl`}
              >
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">150+</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Deals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">68%</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500">₹500Cr+</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Investment</div>
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