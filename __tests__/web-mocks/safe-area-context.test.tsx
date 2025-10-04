import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from '@/web-mocks/safe-area-context';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

// Mock window for useSafeAreaFrame
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
};

let globalWindow: unknown;

beforeAll(() => {
  globalWindow = (globalThis as unknown as { window: unknown }).window;

  Object.defineProperty(globalThis, 'window', {
    value: mockWindow,
    writable: true,
  });
});

afterAll(() => {
  if (globalWindow) {
    (globalThis as unknown as { window: unknown }).window = globalWindow;
  }
});

describe('SafeAreaView', () => {
  it('renders as a View with passed props', () => {
    const { getByTestId } = render(
      <SafeAreaView testID="safe-area" style={{ backgroundColor: 'red' }}>
        <Text>Content</Text>
      </SafeAreaView>,
    );

    const view = getByTestId('safe-area');
    expect(view).toBeTruthy();
    expect(view.props.style).toEqual({ backgroundColor: 'red' });
  });
});

describe('SafeAreaProvider', () => {
  it('renders children without modification', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <Text>Test Child</Text>
      </SafeAreaProvider>,
    );

    expect(getByText('Test Child')).toBeTruthy();
  });
});

describe('useSafeAreaInsets', () => {
  it('returns zero insets', () => {
    let insets: any;
    const TestComponent = () => {
      insets = useSafeAreaInsets();
      return <Text>Test</Text>;
    };

    render(<TestComponent />);

    expect(insets).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });
});

describe('useSafeAreaFrame', () => {
  it('returns frame with window dimensions', () => {
    let frame: any;
    const TestComponent = () => {
      frame = useSafeAreaFrame();
      return <Text>Test</Text>;
    };

    render(<TestComponent />);

    expect(frame).toEqual({
      x: 0,
      y: 0,
      width: 1024,
      height: 768,
    });
  });

  it('returns zero dimensions when window is undefined', () => {
    // Temporarily set window to undefined
    const originalWindow = (globalThis as any).window;
    (globalThis as any).window = undefined;

    let frame: any;
    const TestComponent = () => {
      frame = useSafeAreaFrame();
      return <Text>Test</Text>;
    };

    render(<TestComponent />);

    expect(frame).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    // Restore window
    (globalThis as any).window = originalWindow;
  });
});
