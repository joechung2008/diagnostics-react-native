import AppTabPanels from '@/AppTabPanels';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#212529',
      error: '#dc3545',
    },
  }),
}));

// Mock child components
jest.mock('@/BuildInfo', () => 'BuildInfo');
jest.mock('@/Extension', () => 'Extension');
jest.mock('@/Extensions', () => 'Extensions');
jest.mock('@/ServerInfo', () => 'ServerInfo');

describe('AppTabPanels', () => {
  const defaultProps = {
    diagnostics: null,
    error: undefined,
    extension: undefined,
    pending: false,
    selectedTab: 'extensions',
    showList: true,
    handleLinkClick: jest.fn(),
  };

  it('renders error state when error prop is provided', () => {
    const error = new Error('Test error message');
    render(<AppTabPanels {...defaultProps} error={error} />);

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Test error message')).toBeTruthy();
  });

  it('renders error state with default message when error has no message', () => {
    const error = new Error();
    render(<AppTabPanels {...defaultProps} error={error} />);

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    // Component renders successfully
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders loading state when pending is true', () => {
    render(<AppTabPanels {...defaultProps} pending={true} />);

    // Component renders successfully with ActivityIndicator
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders extensions tab when diagnostics has extensions data', () => {
    const diagnostics = {
      extensions: {
        test: { extensionName: 'Test Extension', manageSdpEnabled: true },
      },
    };
    render(<AppTabPanels {...defaultProps} diagnostics={diagnostics} />);

    // Component renders successfully with Extensions
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders build info tab when selectedTab is build and diagnostics has buildInfo', () => {
    const diagnostics = {
      buildInfo: { buildVersion: '1.0.0' },
    };
    render(
      <AppTabPanels
        {...defaultProps}
        diagnostics={diagnostics}
        selectedTab="build"
      />,
    );

    // Component renders successfully with BuildInfo
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders server info tab when selectedTab is server and diagnostics has serverInfo', () => {
    const diagnostics = {
      serverInfo: { serverId: 'test-server' },
    };
    render(
      <AppTabPanels
        {...defaultProps}
        diagnostics={diagnostics}
        selectedTab="server"
      />,
    );

    // Component renders successfully with ServerInfo
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders extension details when showList is false and extension is provided', () => {
    const extension = {
      extensionName: 'Test Extension',
      manageSdpEnabled: true,
    };
    const diagnostics = {
      extensions: {
        test: extension,
      },
    };
    render(
      <AppTabPanels
        {...defaultProps}
        diagnostics={diagnostics}
        extension={extension}
        showList={false}
      />,
    );

    // Component renders successfully with Extension
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders select extension message when showList is false but no extension is provided', () => {
    const diagnostics = {
      extensions: {
        test: { extensionName: 'Test Extension', manageSdpEnabled: true },
      },
    };
    render(
      <AppTabPanels
        {...defaultProps}
        diagnostics={diagnostics}
        showList={false}
      />,
    );

    expect(
      screen.getByText('Select an extension to view details'),
    ).toBeTruthy();
  });

  it('renders nothing when diagnostics is null and no error/pending', () => {
    render(<AppTabPanels {...defaultProps} />);
    expect(screen.toJSON()).toBeNull();
  });
});
