import React from 'react';
import { Crown, FileText, Zap, Brain, Target, BarChart3, Award, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from 'react-router-dom';

export const PremiumFeatures: React.FC = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Get ML-driven insights on potential deal outcomes and startup success probability with 95% accuracy",
      premium: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Personalized Insights",
      description: "Receive customized investment recommendations based on your preferences and market analysis",
      premium: true,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate detailed PDF reports with comprehensive deal analysis and market intelligence",
      premium: true,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Get instant notifications about new deals, market trends, and investment opportunities",
      premium: true,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep dive into market trends, investment patterns, and predictive modeling",
      premium: false,
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Exclusive access to detailed case studies of successful deals and startup journeys",
      premium: true,
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-12 p-8 rounded-3xl backdrop-blur-xl border ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white/50 border-gray-200/50'
      } shadow-2xl`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Premium Analytics Suite
          </h2>
        </motion.div>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Unlock the full potential of Shark Tank India analytics with our premium features designed for serious investors and analysts.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              feature.premium && !user
                ? 'opacity-75'
                : ''
            } ${
              isDarkMode
                ? 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50'
                : 'bg-white/30 border-gray-200/30 hover:border-gray-300/50'
            } shadow-lg hover:shadow-xl overflow-hidden`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5`} />
            
            {/* Premium badge */}
            {feature.premium && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Crown className="h-3 w-3 text-white" />
                  <span className="text-xs font-semibold text-white">PRO</span>
                </div>
              </div>
            )}
            
            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 w-fit`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              {feature.description}
            </p>
            
            {feature.premium && !user && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <span className="text-sm font-semibold text-yellow-400">Premium Feature</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        >
          <Sparkles className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Unlock Premium Features?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of investors and analysts who trust Tank Time Capsule for their Shark Tank India insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Crown className="h-5 w-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            <div className="text-white/80 text-sm">
              <span>✓ 14-day free trial</span>
              <span className="mx-2">•</span>
              <span>✓ No credit card required</span>
              <span className="mx-2">•</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* User benefits */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`text-center p-6 rounded-2xl ${
            isDarkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
          }`}
        >
          <Award className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-green-500 mb-2">
            Welcome to Premium!
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            You now have access to all premium features and advanced analytics.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};