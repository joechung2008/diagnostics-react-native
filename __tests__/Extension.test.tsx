import Extension from '@/Extension';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#212529',
    },
  }),
}));

// Mock child components
jest.mock('@/Configuration', () => 'Configuration');
jest.mock('@/StageDefinition', () => 'StageDefinition');

describe('Extension', () => {
  it('renders correctly with all props', () => {
    const props = {
      extensionName: 'test-extension',
      manageSdpEnabled: true,
      config: {
        apiUrl: 'https://api.example.com',
        timeout: '30000',
      },
      stageDefinition: {
        development: ['dev1', 'dev2'],
        production: ['prod1'],
      },
    };
    render(<Extension {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with minimal props', () => {
    const props = {
      extensionName: 'minimal-extension',
      manageSdpEnabled: false,
    };
    render(<Extension {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with config only', () => {
    const props = {
      extensionName: 'config-only-extension',
      manageSdpEnabled: true,
      config: {
        debug: 'true',
        logLevel: 'info',
      },
    };
    render(<Extension {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with stage definition only', () => {
    const props = {
      extensionName: 'stage-only-extension',
      manageSdpEnabled: true,
      stageDefinition: {
        staging: ['stage1'],
        production: ['prod1', 'prod2'],
      },
    };
    render(<Extension {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
