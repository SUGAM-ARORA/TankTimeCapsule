export const sharkTankTheme = {
  // Official Shark Tank India Colors
  colors: {
    // Primary Brand Colors
    primary: {
      blue: '#1E3A8A', // Deep blue from logo
      yellow: '#FCD34D', // Bright yellow from logo
      cyan: '#06B6D4', // Cyan accent
      navy: '#0F172A', // Dark navy
    },
    
    // Light Theme
    light: {
      background: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        tertiary: '#F1F5F9',
        accent: '#EFF6FF',
      },
      text: {
        primary: '#0F172A',
        secondary: '#475569',
        tertiary: '#64748B',
        accent: '#1E3A8A',
      },
      border: {
        primary: '#E2E8F0',
        secondary: '#CBD5E1',
        accent: '#3B82F6',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#F8FAFC',
        overlay: 'rgba(255, 255, 255, 0.95)',
      }
    },
    
    // Dark Theme
    dark: {
      background: {
        primary: '#0F172A', // Deep navy like the show
        secondary: '#1E293B',
        tertiary: '#334155',
        accent: '#1E3A8A',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        tertiary: '#94A3B8',
        accent: '#FCD34D',
      },
      border: {
        primary: '#334155',
        secondary: '#475569',
        accent: '#06B6D4',
      },
      surface: {
        card: '#1E293B',
        elevated: '#334155',
        overlay: 'rgba(15, 23, 42, 0.95)',
      }
    },
    
    // Status Colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#06B6D4',
    },
    
    // Shark Colors (for individual shark branding)
    sharks: {
      ashneer: '#EF4444', // Red
      namita: '#8B5CF6', // Purple
      aman: '#06B6D4', // Cyan
      peyush: '#10B981', // Green
      vineeta: '#F59E0B', // Orange
      anupam: '#3B82F6', // Blue
      ghazal: '#EC4899', // Pink
      ritesh: '#6366F1', // Indigo
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    shark: '0 20px 40px -12px rgba(30, 58, 138, 0.3)',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1E3A8A 0%, #06B6D4 100%)',
    secondary: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    shark: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #06B6D4 100%)',
  },
  
  // Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};

export type SharkTankTheme = typeof sharkTankTheme;