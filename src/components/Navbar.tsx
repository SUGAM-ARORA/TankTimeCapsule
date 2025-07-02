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
  Zap,
  Sparkles,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

interface NavbarProps {
  toggleNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleNav }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, profile, signOut } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700/50 text-white' 
          : 'bg-white/80 border-gray-200/50 text-gray-900'
      }`}
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleNav}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-slate-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
                  : 'hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
            
            <Link to="/" className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🦈</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"
                />
              </motion.div>
              <div>
                <motion.h1 
                  className="font-bold text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Tank Time Capsule
                </motion.h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-Powered Analytics Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <motion.div 
            className="flex-1 max-w-2xl mx-8"
            animate={{ scale: searchFocused ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search deals, sharks, startups, or ask AI..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full px-6 py-4 pl-14 pr-16 rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 text-white placeholder-gray-400 border border-slate-700/50 focus:border-blue-500/50 focus:bg-slate-800/70' 
                    : 'bg-white/50 text-gray-900 placeholder-gray-500 border border-gray-200/50 focus:border-blue-500/50 focus:bg-white/70'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-xl shadow-lg hover:shadow-xl`}
              />
              <Search className={`absolute left-5 top-4 h-6 w-6 transition-colors ${
                searchFocused 
                  ? 'text-blue-500' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              
              {/* AI Search Badge */}
              <motion.div
                animate={{ scale: searchFocused ? 1 : 0.9, opacity: searchFocused ? 1 : 0.7 }}
                className="absolute right-4 top-2 flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-xs font-semibold text-white">AI</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-3 rounded-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-slate-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
                  : 'hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              <Bell className="h-6 w-6" />
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
              />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-slate-700/50 hover:shadow-lg hover:shadow-yellow-500/20' 
                  : 'hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-500/20'
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
                    <Sun className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-6 w-6 text-blue-600" />
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
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-slate-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
                      : 'hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user.email}&background=random`}
                      alt="Profile"
                      className="h-10 w-10 rounded-full ring-2 ring-blue-500/30 shadow-lg"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-sm">{profile?.full_name || 'User'}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Premium Member
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-2 w-72 rounded-3xl shadow-2xl border backdrop-blur-2xl ${
                        isDarkMode 
                          ? 'bg-slate-800/90 border-slate-700/50' 
                          : 'bg-white/90 border-gray-200/50'
                      }`}
                    >
                      <div className="p-6 border-b border-gray-200/20">
                        <div className="flex items-center space-x-3">
                          <img
                            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user.email}&background=random`}
                            alt="Profile"
                            className="h-12 w-12 rounded-full"
                          />
                          <div>
                            <p className="font-bold">{profile?.full_name || 'User'}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.email}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Crown className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-yellow-500 font-semibold">Premium</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className={`flex items-center px-6 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-slate-700/50 text-gray-300 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          <User className="h-5 w-5 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          to="/settings"
                          className={`flex items-center px-6 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-slate-700/50 text-gray-300 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          <Settings className="h-5 w-5 mr-3" />
                          Settings
                        </Link>
                        <button
                          onClick={signOut}
                          className={`w-full flex items-center px-6 py-3 transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300' 
                              : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                          }`}
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Zap className="h-5 w-5" />
                  <span>Get Started</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};