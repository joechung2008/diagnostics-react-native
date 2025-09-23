import { renderHook } from '@testing-library/react-native';
import { useAppToolbarStyles } from '@/hooks/useAppToolbarStyles';

describe('useAppToolbarStyles', () => {
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

  it('returns toolbar styles object with correct structure', () => {
    const { result } = renderHook(() => useAppToolbarStyles(mockColors));

    expect(result.current).toHaveProperty('toolbar');
    expect(result.current).toHaveProperty('environmentButton');
    expect(result.current).toHaveProperty('toolbarRight');
    expect(result.current).toHaveProperty('environmentButtonText');
    expect(result.current).toHaveProperty('environmentDropdown');
    expect(result.current).toHaveProperty('environmentOption');
    expect(result.current).toHaveProperty('environmentOptionLast');
    expect(result.current).toHaveProperty('environmentOptionText');
    expect(result.current).toHaveProperty('toolbarButton');
    expect(result.current).toHaveProperty('toolbarButtonText');
    expect(result.current).toHaveProperty('dropdownOverlay');
  });

  it('applies correct colors to toolbar styles', () => {
    const { result } = renderHook(() => useAppToolbarStyles(mockColors));

    expect(result.current.toolbar.backgroundColor).toBe('#f8f9fa');
    expect(result.current.toolbar.borderBottomColor).toBe('#dee2e6');
    expect(result.current.environmentButton.backgroundColor).toBe('#e9ecef');
    expect(result.current.environmentButtonText.color).toBe('#212529');
    expect(result.current.toolbarButtonText.color).toBe('#007bff');
    expect(result.current.environmentDropdown.backgroundColor).toBe('#f8f9fa');
    expect(result.current.environmentDropdown.borderColor).toBe('#dee2e6');
    expect(result.current.environmentOption.backgroundColor).toBe('#f8f9fa');
    expect(result.current.environmentOption.borderBottomColor).toBe('#adb5bd');
    expect(result.current.environmentOptionText.color).toBe('#212529');
  });

  it('returns consistent styles on multiple calls', () => {
    const { result: result1 } = renderHook(() =>
      useAppToolbarStyles(mockColors),
    );
    const { result: result2 } = renderHook(() =>
      useAppToolbarStyles(mockColors),
    );

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

    const { result } = renderHook(() => useAppToolbarStyles(darkColors));

    expect(result.current.toolbar.backgroundColor).toBe('#1e1e1e');
    expect(result.current.environmentButton.backgroundColor).toBe('#2a2a2a');
    expect(result.current.toolbarButtonText.color).toBe('#bb86fc');
  });

  it('includes all required toolbar style properties', () => {
    const { result } = renderHook(() => useAppToolbarStyles(mockColors));

    // Test toolbar style
    expect(result.current.toolbar).toEqual({
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 44,
      padding: 10,
      backgroundColor: '#f8f9fa',
      borderBottomWidth: 1,
      borderBottomColor: '#dee2e6',
    });

    // Test environment button style
    expect(result.current.environmentButton).toEqual({
      alignSelf: 'center',
      padding: 10,
      minWidth: 120,
      backgroundColor: '#e9ecef',
      borderRadius: 4,
    });

    // Test dropdown overlay
    expect(result.current.dropdownOverlay).toEqual({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    });
  });
});
