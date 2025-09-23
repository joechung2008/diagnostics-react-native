import Extensions from '@/Extensions';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      border: '#dee2e6',
    },
  }),
}));

describe('Extensions', () => {
  const mockOnLinkClick = jest.fn();

  it('renders correctly with multiple extensions', () => {
    const extensions = {
      'extension-a': {
        extensionName: 'extension-a',
        manageSdpEnabled: true,
        config: { enabled: 'true' },
      },
      'extension-b': {
        extensionName: 'extension-b',
        manageSdpEnabled: false,
      },
      'extension-c': {
        extensionName: 'extension-c',
        manageSdpEnabled: true,
        stageDefinition: {
          production: ['prod1'],
        },
      },
    };

    render(
      <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with single extension', () => {
    const extensions = {
      'single-extension': {
        extensionName: 'single-extension',
        manageSdpEnabled: true,
      },
    };

    render(
      <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with extension errors (filtered out)', () => {
    const extensions = {
      'good-extension': {
        extensionName: 'good-extension',
        manageSdpEnabled: true,
      },
      'bad-extension': {
        lastError: {
          errorMessage: 'Something went wrong',
          time: '2023-01-01T00:00:00Z',
        },
      },
    };

    render(
      <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with empty extensions', () => {
    const extensions = {};

    render(
      <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly without onLinkClick handler', () => {
    const extensions = {
      'test-extension': {
        extensionName: 'test-extension',
        manageSdpEnabled: true,
      },
    };

    render(
      <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
