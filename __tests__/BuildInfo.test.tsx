import BuildInfo from '@/BuildInfo';
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

describe('BuildInfo', () => {
  it('renders correctly with build version', () => {
    render(<BuildInfo buildVersion="1.0.0" />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
