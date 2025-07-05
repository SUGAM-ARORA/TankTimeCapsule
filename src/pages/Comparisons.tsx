import React, { useState, useMemo } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useDealsStore } from '../store/useDealsStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Award, 
  BarChart3,
  Users,
  Zap,
  Crown,
  Star
} from 'lucide-react';

export const Comparisons: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { sharks, getSharkComparison } = useDealsStore();
  const [selectedShark1, setSelectedShark1] = useState('');
  const [selectedShark2, setSelectedShark2] = useState('');

  const comparison = useMemo(() => {
    if (selectedShark1 && selectedShark2) {
      return getSharkComparison(selectedShark1, selectedShark2);
    }
    return null;
  }, [selectedShark1, selectedShark2, getSharkComparison]);

  const availableSharks = sharks.filter(shark => shark.total_deals > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-shark-gradient bg-clip-text text-transparent">
          Shark Comparison Arena
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Compare investment strategies, success rates, and deal patterns
        </p>
      </motion.div>

      {/* Shark Selection */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-3xl backdrop-blur-xl border ${
          isDarkMode 
            ? 'bg-shark-gray-800/50 border-shark-gray-700/50' 
            : 'bg-white/50 border-shark-gray-200/50'
        } shadow-shark-xl`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Shark 1 Selection */}
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium mb-3">Select First Shark</label>
            <select
              value={selectedShark1}
              onChange={(e) => setSelectedShark1(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-shark-gray-800 border-shark-gray-600 text-white'
                  : 'bg-white border-shark-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-shark-blue-500 focus:border-transparent shadow-lg`}
            >
              <option value="">Choose a shark...</option>
              {availableSharks.map(shark => (
                <option key={shark.id} value={shark.name} disabled={shark.name === selectedShark2}>
                  {shark.name} ({shark.total_deals} deals)
                </option>
              ))}
            </select>
          </div>

          {/* VS Indicator */}
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-shark-gradient rounded-full flex items-center justify-center shadow-shark-glow"
            >
              <span className="text-white font-bold text-xl">VS</span>
            </motion.div>
          </div>

          {/* Shark 2 Selection */}
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium mb-3">Select Second Shark</label>
            <select
              value={selectedShark2}
              onChange={(e) => setSelectedShark2(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-shark-gray-800 border-shark-gray-600 text-white'
                  : 'bg-white border-shark-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-shark-blue-500 focus:border-transparent shadow-lg`}
            >
              <option value="">Choose a shark...</option>
              {availableSharks.map(shark => (
                <option key={shark.id} value={shark.name} disabled={shark.name === selectedShark1}>
                  {shark.name} ({shark.total_deals} deals)
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Comparison Results */}
      <AnimatePresence>
        {comparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Shark Profiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[comparison.shark1, comparison.shark2].map((shark, index) => (
                <motion.div
                  key={shark.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-8 rounded-3xl backdrop-blur-xl border ${
                    isDarkMode 
                      ? 'bg-shark-gray-800/50 border-shark-gray-700/50' 
                      : 'bg-white/50 border-shark-gray-200/50'
                  } shadow-shark-xl relative overflow-hidden`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 ? 'from-shark-blue-500/10 to-shark-teal-500/10' : 'from-shark-gold-500/10 to-shark-warm-500/10'
                  }`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <img
                        src={shark.profile_image}
                        alt={shark.name}
                        className="w-16 h-16 rounded-full ring-4 ring-shark-blue-500/30 shadow-lg mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-bold">{shark.name}</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {shark.company}
                        </p>
                        <div className="flex items-center mt-1">
                          <Crown className="h-4 w-4 text-shark-gold-500 mr-1" />
                          <span className="text-sm font-semibold text-shark-gold-500">
                            {shark.net_worth}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-shark-gray-700/50' : 'bg-shark-gray-100/50'
                      }`}>
                        <div className="text-2xl font-bold text-shark-blue-500">{shark.total_deals}</div>
                        <div className="text-sm text-gray-500">Total Deals</div>
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-shark-gray-700/50' : 'bg-shark-gray-100/50'
                      }`}>
                        <div className="text-2xl font-bold text-shark-teal-500">
                          ₹{(shark.total_investment / 10000000).toFixed(1)}Cr
                        </div>
                        <div className="text-sm text-gray-500">Investment</div>
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-shark-gray-700/50' : 'bg-shark-gray-100/50'
                      }`}>
                        <div className="text-2xl font-bold text-shark-gold-500">
                          {shark.success_rate?.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">Success Rate</div>
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-shark-gray-700/50' : 'bg-shark-gray-100/50'
                      }`}>
                        <div className="text-2xl font-bold text-shark-warm-500">
                          ₹{(shark.avgDealSize / 10000000).toFixed(1)}Cr
                        </div>
                        <div className="text-sm text-gray-500">Avg Deal</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {shark.expertise?.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-shark-blue-500/20 text-shark-blue-500 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Preferred Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {shark.industries?.slice(0, 3).map((industry, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-shark-teal-500/20 text-shark-teal-500 rounded-full text-sm font-medium"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-shark-gray-800/50 border-shark-gray-700/50' 
                  : 'bg-white/50 border-shark-gray-200/50'
              } shadow-shark-xl`}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-shark-blue-500" />
                Head-to-Head Comparison
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-shark-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Deal Volume</h4>
                  <div className="text-3xl font-bold mb-2">
                    {comparison.comparison.totalDealsComparison > 0 ? (
                      <span className="text-shark-blue-500">+{comparison.comparison.totalDealsComparison}</span>
                    ) : comparison.comparison.totalDealsComparison < 0 ? (
                      <span className="text-shark-warm-500">{comparison.comparison.totalDealsComparison}</span>
                    ) : (
                      <span className="text-shark-gray-500">Equal</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedShark1} vs {selectedShark2}
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-shark-teal-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Investment Gap</h4>
                  <div className="text-3xl font-bold mb-2">
                    {comparison.comparison.totalInvestmentComparison > 0 ? (
                      <span className="text-shark-teal-500">
                        +₹{(comparison.comparison.totalInvestmentComparison / 10000000).toFixed(1)}Cr
                      </span>
                    ) : comparison.comparison.totalInvestmentComparison < 0 ? (
                      <span className="text-shark-warm-500">
                        ₹{(comparison.comparison.totalInvestmentComparison / 10000000).toFixed(1)}Cr
                      </span>
                    ) : (
                      <span className="text-shark-gray-500">Equal</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Investment difference</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-shark-gold-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Success Rate</h4>
                  <div className="text-3xl font-bold mb-2">
                    {comparison.comparison.successRateComparison > 0 ? (
                      <span className="text-shark-gold-500">
                        +{comparison.comparison.successRateComparison.toFixed(1)}%
                      </span>
                    ) : comparison.comparison.successRateComparison < 0 ? (
                      <span className="text-shark-warm-500">
                        {comparison.comparison.successRateComparison.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-shark-gray-500">Equal</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Success rate difference</p>
                </div>
              </div>
            </motion.div>

            {/* Common Industries */}
            {comparison.comparison.commonIndustries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-8 rounded-3xl backdrop-blur-xl border ${
                  isDarkMode 
                    ? 'bg-shark-gray-800/50 border-shark-gray-700/50' 
                    : 'bg-white/50 border-shark-gray-200/50'
                } shadow-shark-xl`}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-shark-teal-500" />
                  Common Ground
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Shared Industries</h4>
                    <div className="flex flex-wrap gap-3">
                      {comparison.comparison.commonIndustries.map((industry, index) => (
                        <motion.span
                          key={industry}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="px-4 py-2 bg-shark-teal-500/20 text-shark-teal-500 rounded-2xl font-medium flex items-center"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          {industry}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      {!selectedShark1 || !selectedShark2 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-6 bg-shark-gradient rounded-full flex items-center justify-center shadow-shark-glow"
          >
            <Zap className="h-10 w-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">Select Two Sharks to Compare</h3>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose any two sharks from the dropdown menus above to see their detailed comparison
          </p>
        </motion.div>
      ) : null}
    </div>
  );
};