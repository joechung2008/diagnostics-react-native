import AppTabHeaders from '@/AppTabHeaders';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#212529',
      primary: '#007bff',
    },
  }),
}));

// Mock styles hook
jest.mock('@/hooks/useAppTabHeadersStyles', () => ({
  useAppTabHeadersStyles: () => ({
    tabHeader: {},
    tabButton: {},
    activeTab: {},
    inactiveTab: {},
  }),
}));

describe('AppTabHeaders', () => {
  const defaultProps = {
    selectedTab: 'extensions',
    setSelectedTab: jest.fn(),
    showList: true,
    setShowList: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const { toJSON } = render(<AppTabHeaders {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with different selected tab', () => {
    const { toJSON } = render(
      <AppTabHeaders {...defaultProps} selectedTab="build" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when showList is false', () => {
    const { toJSON } = render(
      <AppTabHeaders {...defaultProps} showList={false} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
