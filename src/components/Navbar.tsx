import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ChevronDown,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, profile, signOut } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50 text-white' 
          : 'bg-white/80 border-gray-200/50 text-gray-800'
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
            
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <span className="text-white text-xl">🦈</span>
              </motion.div>
              <motion.span 
                className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Tank Time Capsule
              </motion.span>
            </Link>
          </div>

          {/* Search Bar */}
          <motion.div 
            className="flex-1 max-w-xl mx-8"
            animate={{ scale: searchFocused ? 1.02 : 1 }}
          >
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search deals, sharks, or startups..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full px-4 py-3 pl-12 rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700/50 focus:border-blue-500/50' 
                    : 'bg-gray-100/50 text-gray-800 placeholder-gray-500 border border-gray-200/50 focus:border-blue-500/50'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <Search className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${
                searchFocused 
                  ? 'text-blue-500' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </motion.div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Bell className="h-6 w-6" />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"
              />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-5 w-5 text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 p-2 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user.email}&background=random`}
                      alt="Profile"
                      className="h-8 w-8 rounded-full ring-2 ring-blue-500/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"
                    />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border backdrop-blur-xl ${
                        isDarkMode 
                          ? 'bg-gray-800/90 border-gray-700/50' 
                          : 'bg-white/90 border-gray-200/50'
                      }`}
                    >
                      <div className="p-4 border-b border-gray-200/20">
                        <p className="font-semibold">{profile?.full_name || 'User'}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className={`flex items-center px-4 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700/50' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <User className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          to="/settings"
                          className={`flex items-center px-4 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700/50' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        <button
                          onClick={signOut}
                          className={`w-full flex items-center px-4 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-red-500/20 text-red-400' 
                              : 'hover:bg-red-50 text-red-600'
                          }`}
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Zap className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};