import AppContent from '@/AppContent';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#212529',
    },
  }),
}));

// Mock hooks
jest.mock('@/hooks/useAppContent', () => ({
  useAppContent: () => ({
    diagnostics: null,
    environment: 'https://api.example.com',
    error: null,
    extension: null,
    pending: false,
    selectedTab: 'extensions',
    setSelectedTab: jest.fn(),
    setShowEnvironmentPicker: jest.fn(),
    setShowList: jest.fn(),
    showEnvironmentPicker: false,
    showList: true,
    showPaasServerless: false,
    handleEnvironmentChange: jest.fn(),
    handleLinkClick: jest.fn(),
    handlePaasServerlessPress: jest.fn(),
    handleWebsitesPress: jest.fn(),
  }),
}));

jest.mock('@/hooks/useAppStyles', () => ({
  useStyles: () => ({}),
}));

// Mock child components
jest.mock('@/AppTabHeaders', () => 'AppTabHeaders');
jest.mock('@/AppTabPanels', () => 'AppTabPanels');
jest.mock('@/AppToolbar', () => 'AppToolbar');

describe('AppContent', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<AppContent />);
    expect(toJSON()).toMatchSnapshot();
  });
});
