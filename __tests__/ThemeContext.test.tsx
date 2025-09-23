import { darkTheme, lightTheme, ThemeProvider, useTheme } from '@/ThemeContext';
import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

// Mock React Native's Appearance module
const mockGetColorScheme = jest.fn();
const mockAddChangeListener = jest.fn();
const mockRemove = jest.fn();

jest.doMock('react-native/Libraries/Utilities/Appearance', () => ({
  getColorScheme: mockGetColorScheme,
  addChangeListener: mockAddChangeListener,
}));

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetColorScheme.mockReturnValue('light');
    mockAddChangeListener.mockReturnValue({ remove: mockRemove });
  });

  describe('useTheme hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      const TestComponent = () => {
        useTheme();
        return <Text>Test</Text>;
      };

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('returns theme context when used inside ThemeProvider', () => {
      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(themeContext).toBeDefined();
      expect(themeContext.theme).toBe('system');
      expect(themeContext.colors).toEqual(lightTheme);
      expect(themeContext.setTheme).toBeInstanceOf(Function);
      expect(themeContext.isDark).toBe(false);
    });
  });

  describe('ThemeProvider', () => {
    it('provides default system theme on mount', () => {
      mockGetColorScheme.mockReturnValue('light');

      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(themeContext.theme).toBe('system');
      expect(themeContext.colors).toEqual(lightTheme);
      expect(themeContext.isDark).toBe(false);
    });

    it('provides dark theme when system theme is dark', () => {
      mockGetColorScheme.mockReturnValue('dark');

      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(themeContext.theme).toBe('system');
      expect(themeContext.colors).toEqual(darkTheme);
      expect(themeContext.isDark).toBe(true);
    });

    it('provides light theme when explicitly set to light', () => {
      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        themeContext.setTheme('light');
      });

      expect(themeContext.theme).toBe('light');
      expect(themeContext.colors).toEqual(lightTheme);
      expect(themeContext.isDark).toBe(false);
    });

    it('provides dark theme when explicitly set to dark', () => {
      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        themeContext.setTheme('dark');
      });

      expect(themeContext.theme).toBe('dark');
      expect(themeContext.colors).toEqual(darkTheme);
      expect(themeContext.isDark).toBe(true);
    });

    it('switches back to system theme when set to system', () => {
      mockGetColorScheme.mockReturnValue('dark');

      let themeContext: any;

      const TestComponent = () => {
        themeContext = useTheme();
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // Set to light first
      act(() => {
        themeContext.setTheme('light');
      });
      expect(themeContext.theme).toBe('light');
      expect(themeContext.isDark).toBe(false);

      // Switch back to system (should be dark)
      act(() => {
        themeContext.setTheme('system');
      });
      expect(themeContext.theme).toBe('system');
      expect(themeContext.isDark).toBe(true);
    });

    it('responds to system theme changes', () => {
      mockGetColorScheme.mockReturnValue('light');

      let themeContext: any;
      let renderCount = 0;

      const TestComponent = () => {
        themeContext = useTheme();
        renderCount++;
        return <Text>Test</Text>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(themeContext.isDark).toBe(false);
      expect(renderCount).toBe(1);

      // Simulate system theme change
      act(() => {
        const listener = mockAddChangeListener.mock.calls[0][0];
        listener({ colorScheme: 'dark' });
      });

      expect(themeContext.isDark).toBe(true);
      expect(renderCount).toBe(2);
    });

    it('cleans up appearance listener on unmount', () => {
      const { unmount } = render(
        <ThemeProvider>
          <Text>Test</Text>
        </ThemeProvider>,
      );

      unmount();

      expect(mockRemove).toHaveBeenCalled();
    });

    it('renders children correctly', () => {
      render(
        <ThemeProvider>
          <Text>Hello World</Text>
        </ThemeProvider>,
      );

      expect(screen.getByText('Hello World')).toBeTruthy();
    });
  });

  describe('Theme colors', () => {
    it('lightTheme has correct structure', () => {
      expect(lightTheme).toHaveProperty('background', '#ffffff');
      expect(lightTheme).toHaveProperty('text', '#212529');
      expect(lightTheme).toHaveProperty('primary', '#0056b3');
      expect(lightTheme).toHaveProperty('tableBorder', '#dee2e6');
    });

    it('darkTheme has correct structure', () => {
      expect(darkTheme).toHaveProperty('background', '#121212');
      expect(darkTheme).toHaveProperty('text', '#ffffff');
      expect(darkTheme).toHaveProperty('primary', '#4dabf7');
      expect(darkTheme).toHaveProperty('tableBorder', '#404040');
    });
  });
});
