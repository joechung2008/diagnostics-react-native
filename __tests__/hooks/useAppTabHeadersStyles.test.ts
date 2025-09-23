import { useAppTabHeadersStyles } from '@/hooks/useAppTabHeadersStyles';
import { renderHook } from '@testing-library/react-native';

describe('useAppTabHeadersStyles', () => {
  const mockColors = {
    background: '#ffffff',
    surface: '#f8f9fa',
    surfaceSecondary: '#e9ecef',
    border: '#dee2e6',
    borderSecondary: '#adb5bd',
    text: '#212529',
    textSecondary: '#6c757d',
    primary: '#007bff',
    error: '#dc3545',
  };

  it('returns tab headers styles object with correct structure', () => {
    const { result } = renderHook(() => useAppTabHeadersStyles(mockColors));

    expect(result.current).toHaveProperty('tabList');
    expect(result.current).toHaveProperty('tab');
    expect(result.current).toHaveProperty('tabSelected');
    expect(result.current).toHaveProperty('tabText');
    expect(result.current).toHaveProperty('tabTextSelected');
  });

  it('applies correct colors to tab headers styles', () => {
    const { result } = renderHook(() => useAppTabHeadersStyles(mockColors));

    expect(result.current.tabList.backgroundColor).toBe('#f8f9fa');
    expect(result.current.tabList.borderBottomColor).toBe('#dee2e6');
    expect(result.current.tabSelected.borderBottomColor).toBe('#007bff');
    expect(result.current.tabText.color).toBe('#6c757d');
    expect(result.current.tabTextSelected.color).toBe('#007bff');
  });

  it('returns consistent styles on multiple calls', () => {
    const { result: result1 } = renderHook(() =>
      useAppTabHeadersStyles(mockColors),
    );
    const { result: result2 } = renderHook(() =>
      useAppTabHeadersStyles(mockColors),
    );

    expect(result1.current).toEqual(result2.current);
  });

  it('handles different color themes', () => {
    const darkColors = {
      background: '#121212',
      surface: '#1e1e1e',
      surfaceSecondary: '#2d2d2d',
      border: '#404040',
      borderSecondary: '#333333',
      text: '#ffffff',
      textSecondary: '#cccccc',
      primary: '#bb86fc',
      error: '#cf6679',
    };

    const { result } = renderHook(() => useAppTabHeadersStyles(darkColors));

    expect(result.current.tabList.backgroundColor).toBe('#1e1e1e');
    expect(result.current.tabSelected.borderBottomColor).toBe('#bb86fc');
    expect(result.current.tabTextSelected.color).toBe('#bb86fc');
  });

  it('includes all required tab headers style properties', () => {
    const { result } = renderHook(() => useAppTabHeadersStyles(mockColors));

    // Test tabList style
    expect(result.current.tabList).toEqual({
      flexDirection: 'row',
      backgroundColor: '#f8f9fa',
      borderBottomWidth: 1,
      borderBottomColor: '#dee2e6',
    });

    // Test tab style
    expect(result.current.tab).toEqual({
      flex: 1,
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    });

    // Test tabSelected style
    expect(result.current.tabSelected).toEqual({
      borderBottomColor: '#007bff',
    });

    // Test tabText style
    expect(result.current.tabText).toEqual({
      fontSize: 14,
      color: '#6c757d',
    });

    // Test tabTextSelected style
    expect(result.current.tabTextSelected).toEqual({
      fontWeight: '600',
      color: '#007bff',
    });
  });
});
