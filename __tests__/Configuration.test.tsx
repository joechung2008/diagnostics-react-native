import Configuration from '@/Configuration';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      tableBorder: '#dee2e6',
      tableHeaderBg: '#f8f9fa',
    },
  }),
}));

describe('Configuration', () => {
  it('renders correctly with configuration data', () => {
    const config = {
      apiUrl: 'https://api.example.com',
      timeout: '30000',
      debug: 'true',
    };
    render(<Configuration config={config} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with empty configuration', () => {
    const config = {};
    render(<Configuration config={config} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
