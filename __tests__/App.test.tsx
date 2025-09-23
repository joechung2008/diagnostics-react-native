import App from '@/App';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock child components
jest.mock('@/AppContent', () => 'AppContent');
jest.mock('@/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('App', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
