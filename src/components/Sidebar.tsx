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
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { isDarkMode } = useThemeStore();
  const location = useLocation();

  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Sharks', path: '/sharks', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Deals', path: '/deals', color: 'from-green-500 to-emerald-500' },
    { icon: PieChart, label: 'Analytics', path: '/analytics', color: 'from-orange-500 to-red-500' },
    { icon: Table, label: 'Deal Table', path: '/deal-table', color: 'from-indigo-500 to-purple-500' },
    { icon: Activity, label: 'Predictions', path: '/predictions', color: 'from-pink-500 to-rose-500' },
    { icon: Lightbulb, label: 'Insights', path: '/insights', color: 'from-yellow-500 to-orange-500' },
    { icon: LineChart, label: 'Trends', path: '/trends', color: 'from-teal-500 to-cyan-500' },
    { icon: Building2, label: 'Startups', path: '/startups', color: 'from-violet-500 to-purple-500' },
    { icon: Factory, label: 'Industries', path: '/industries', color: 'from-emerald-500 to-teal-500' },
    { icon: GitCompare, label: 'Comparisons', path: '/comparisons', color: 'from-blue-500 to-indigo-500' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: -300,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      x: -20
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      className={`fixed left-0 top-16 h-full w-72 z-40 backdrop-blur-xl border-r ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } shadow-xl overflow-y-auto`}
    >
      <div className="p-6">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white`}
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Premium Analytics</span>
          </div>
          <p className="text-sm mt-1 opacity-90">
            Unlock advanced insights and predictions
          </p>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`group flex items-center px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                        : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border border-blue-500/20'
                      : isDarkMode
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                    />
                  )}
                  
                  {/* Icon with gradient background */}
                  <div className={`relative p-2 rounded-xl mr-3 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.color}` 
                      : isDarkMode 
                        ? 'bg-gray-700/50 group-hover:bg-gray-600/50' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                  } transition-all duration-300`}>
                    <item.icon className={`h-5 w-5 ${
                      isActive 
                        ? 'text-white' 
                        : isDarkMode 
                          ? 'text-gray-400 group-hover:text-white' 
                          : 'text-gray-600 group-hover:text-gray-800'
                    }`} />
                  </div>
                  
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`mt-8 p-4 rounded-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30' 
              : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200/50'
          }`}
        >
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Deals</span>
              <span className="font-semibold">150+</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Success Rate</span>
              <span className="font-semibold text-green-500">65%</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Investment</span>
              <span className="font-semibold">₹500Cr+</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};