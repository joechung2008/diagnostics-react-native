import { renderHook } from '@testing-library/react-native';
import { useStyles } from '@/hooks/useAppStyles';

describe('useAppStyles', () => {
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

  it('returns styles object with correct structure', () => {
    const { result } = renderHook(() => useStyles(mockColors));

    expect(result.current).toHaveProperty('flexbox');
  });

  it('applies correct colors to flexbox style', () => {
    const { result } = renderHook(() => useStyles(mockColors));

    expect(result.current.flexbox.backgroundColor).toBe('#ffffff');
  });

  it('returns consistent styles on multiple calls', () => {
    const { result: result1 } = renderHook(() => useStyles(mockColors));
    const { result: result2 } = renderHook(() => useStyles(mockColors));

    expect(result1.current).toEqual(result2.current);
  });

  it('handles different color themes', () => {
    const darkColors = {
      background: '#121212',
      surface: '#1e1e1e',
      surfaceSecondary: '#2a2a2a',
      border: '#333333',
      borderSecondary: '#444444',
      text: '#ffffff',
      textSecondary: '#cccccc',
      primary: '#bb86fc',
      error: '#cf6679',
    };

    const { result } = renderHook(() => useStyles(darkColors));

    expect(result.current.flexbox.backgroundColor).toBe('#121212');
  });

  it('includes platform-specific height for flexbox', () => {
    const { result } = renderHook(() => useStyles(mockColors));

    // The flexbox style should include height based on platform
    expect(result.current.flexbox).toHaveProperty('height');
    expect(result.current.flexbox.position).toBe('relative');
    expect(result.current.flexbox.flex).toBe(1);
    expect(result.current.flexbox.flexDirection).toBe('column');
  });
});
