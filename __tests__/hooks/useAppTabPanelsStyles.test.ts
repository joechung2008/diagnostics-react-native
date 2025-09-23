import { useAppTabPanelsStyles } from '@/hooks/useAppTabPanelsStyles';
import { renderHook } from '@testing-library/react-native';

describe('useAppTabPanelsStyles', () => {
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

  it('returns tab panels styles object with correct structure', () => {
    const { result } = renderHook(() => useAppTabPanelsStyles(mockColors));

    expect(result.current).toHaveProperty('tabPanel');
    expect(result.current).toHaveProperty('errorText');
    expect(result.current).toHaveProperty('errorContainer');
    expect(result.current).toHaveProperty('errorTitle');
    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('loadingContainer');
  });

  it('applies correct colors to tab panels styles', () => {
    const { result } = renderHook(() => useAppTabPanelsStyles(mockColors));

    expect(result.current.tabPanel.backgroundColor).toBe('#ffffff');
    expect(result.current.errorText.color).toBe('#dc3545');
    expect(result.current.errorContainer.backgroundColor).toBe('#ffffff');
    expect(result.current.errorTitle.color).toBe('#dc3545');
    expect(result.current.errorMessage.color).toBe('#212529');
    expect(result.current.loadingContainer.backgroundColor).toBe('#ffffff');
  });

  it('returns consistent styles on multiple calls', () => {
    const { result: result1 } = renderHook(() =>
      useAppTabPanelsStyles(mockColors),
    );
    const { result: result2 } = renderHook(() =>
      useAppTabPanelsStyles(mockColors),
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

    const { result } = renderHook(() => useAppTabPanelsStyles(darkColors));

    expect(result.current.tabPanel.backgroundColor).toBe('#121212');
    expect(result.current.errorText.color).toBe('#cf6679');
    expect(result.current.errorContainer.backgroundColor).toBe('#121212');
    expect(result.current.errorTitle.color).toBe('#cf6679');
    expect(result.current.errorMessage.color).toBe('#ffffff');
    expect(result.current.loadingContainer.backgroundColor).toBe('#121212');
  });

  it('includes all required tab panels style properties', () => {
    const { result } = renderHook(() => useAppTabPanelsStyles(mockColors));

    // Test tabPanel style
    expect(result.current.tabPanel).toEqual({
      flex: 1,
      backgroundColor: '#ffffff',
      overflow: 'hidden',
    });

    // Test errorText style
    expect(result.current.errorText).toEqual({
      fontSize: 16,
      textAlign: 'center',
      color: '#dc3545',
    });

    // Test errorContainer style
    expect(result.current.errorContainer).toEqual({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 20,
    });

    // Test errorTitle style
    expect(result.current.errorTitle).toEqual({
      fontSize: 18,
      fontWeight: 'bold',
      color: '#dc3545',
      marginBottom: 10,
      textAlign: 'center',
    });

    // Test errorMessage style
    expect(result.current.errorMessage).toEqual({
      fontSize: 16,
      color: '#212529',
      textAlign: 'center',
    });

    // Test loadingContainer style
    expect(result.current.loadingContainer).toEqual({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    });
  });
});
