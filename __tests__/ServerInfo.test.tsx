import ServerInfo from '@/ServerInfo';
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

describe('ServerInfo', () => {
  it('renders correctly with all server info', () => {
    const props = {
      deploymentId: 'deploy-123',
      extensionSync: {
        totalSyncAllCount: 42,
      },
      hostname: 'server.example.com',
      nodeVersions: 'v18.17.0',
      serverId: 'server-456',
      uptime: 1234567890,
    };
    render(<ServerInfo {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with minimal server info', () => {
    const props = {
      deploymentId: 'deploy-123',
      extensionSync: {
        totalSyncAllCount: 0,
      },
      hostname: 'localhost',
      nodeVersions: undefined,
      serverId: 'server-456',
      uptime: undefined,
    };
    render(<ServerInfo {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
