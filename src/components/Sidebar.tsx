import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';

// This component is now deprecated in favor of FloatingNavigation
// Keeping it for backward compatibility but it won't be used

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { isDarkMode } = useThemeStore();

  // Return null since we're using FloatingNavigation instead
  return null;
};