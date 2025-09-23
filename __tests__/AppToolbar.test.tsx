import AppToolbar from '@/AppToolbar';
import { Environment } from '@/lib/environment';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#212529',
      primary: '#007bff',
      surface: '#f8f9fa',
    },
  }),
}));

// Mock styles hook
jest.mock('@/hooks/useAppToolbarStyles', () => ({
  useAppToolbarStyles: () => ({
    toolbar: {},
    toolbarButton: {},
    environmentButton: {},
    environmentText: {},
    pickerContainer: {},
    pickerButton: {},
  }),
}));

describe('AppToolbar', () => {
  const defaultProps = {
    environment: Environment.Public,
    setShowEnvironmentPicker: jest.fn(),
    showEnvironmentPicker: false,
    showPaasServerless: false,
    handleEnvironmentChange: jest.fn(),
    handlePaasServerlessPress: jest.fn(),
    handleWebsitesPress: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const { toJSON } = render(<AppToolbar {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with environment picker shown', () => {
    const { toJSON } = render(
      <AppToolbar {...defaultProps} showEnvironmentPicker={true} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with PaaS Serverless shown', () => {
    const { toJSON } = render(
      <AppToolbar {...defaultProps} showPaasServerless={true} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with different environment', () => {
    const { toJSON } = render(
      <AppToolbar {...defaultProps} environment={Environment.Fairfax} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
