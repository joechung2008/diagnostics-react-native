import { renderHook, act } from '@testing-library/react-native';
import { Environment } from '@/lib/environment';
import { useAppContent } from '@/hooks/useAppContent';

// Mock useSWR to return mock diagnostics data
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: {
      extensions: {
        test: { extensionName: 'Test Extension', manageSdpEnabled: true },
        paasserverless: {
          extensionName: 'PaaS Serverless',
          manageSdpEnabled: false,
        },
        websites: { extensionName: 'Websites', manageSdpEnabled: true },
      },
      buildInfo: { buildVersion: '1.0.0' },
      serverInfo: { serverId: 'test-server', hostname: 'test-host' },
    },
    error: null,
    isLoading: false,
  })),
}));

describe('useApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useAppContent());

    expect(result.current.environment).toBe(Environment.Public);
    expect(result.current.showEnvironmentPicker).toBe(false);
    expect(result.current.extension).toBeUndefined();
    expect(result.current.selectedTab).toBe('extensions');
    expect(result.current.showList).toBe(true);
  });

  it('provides all required handlers', () => {
    const { result } = renderHook(() => useAppContent());

    expect(typeof result.current.setShowEnvironmentPicker).toBe('function');
    expect(typeof result.current.setSelectedTab).toBe('function');
    expect(typeof result.current.setShowList).toBe('function');
    expect(typeof result.current.handleLinkClick).toBe('function');
    expect(typeof result.current.handleEnvironmentChange).toBe('function');
    expect(typeof result.current.handlePaasServerlessPress).toBe('function');
    expect(typeof result.current.handleWebsitesPress).toBe('function');
  });

  it('handleEnvironmentChange updates environment and resets state', () => {
    const { result } = renderHook(() => useAppContent());

    act(() => {
      result.current.handleEnvironmentChange(Environment.Fairfax);
    });

    expect(result.current.environment).toBe(Environment.Fairfax);
    expect(result.current.extension).toBeUndefined();
    expect(result.current.selectedTab).toBe('extensions');
    expect(result.current.showList).toBe(true);
    expect(result.current.showEnvironmentPicker).toBe(false);
  });

  it('setSelectedTab updates selected tab', () => {
    const { result } = renderHook(() => useAppContent());

    act(() => {
      result.current.setSelectedTab('build');
    });

    expect(result.current.selectedTab).toBe('build');
  });

  it('setShowList updates show list state', () => {
    const { result } = renderHook(() => useAppContent());

    act(() => {
      result.current.setShowList(false);
    });

    expect(result.current.showList).toBe(false);
  });

  it('setShowEnvironmentPicker updates environment picker state', () => {
    const { result } = renderHook(() => useAppContent());

    act(() => {
      result.current.setShowEnvironmentPicker(true);
    });

    expect(result.current.showEnvironmentPicker).toBe(true);
  });

  it('fetches diagnostics data on environment change', () => {
    const { result } = renderHook(() => useAppContent());

    expect(result.current.diagnostics).toBeDefined();
  });

  it('computes showPaasServerless based on diagnostics', () => {
    const { result } = renderHook(() => useAppContent());

    // With the mock data including paasserverless extension, should be true
    expect(result.current.showPaasServerless).toBe(true);
  });

  it('handleLinkClick updates extension and showList state', () => {
    const { result } = renderHook(() => useAppContent());

    // Debug: check what diagnostics contains
    expect(result.current.diagnostics).toBeDefined();
    expect(result.current.diagnostics?.extensions).toBeDefined();
    expect(result.current.diagnostics?.extensions.test).toEqual({
      extensionName: 'Test Extension',
      manageSdpEnabled: true,
    });

    act(() => {
      result.current.handleLinkClick({ key: 'test', name: 'Test' });
    });

    expect(result.current.extension).toEqual({
      extensionName: 'Test Extension',
      manageSdpEnabled: true,
    });
    expect(result.current.showList).toBe(false);
  });
});
