import { isExtensionInfo, byKey, toNavLink, when } from '../src/lib/utils';

describe('utils', () => {
  describe('isExtensionInfo', () => {
    it('should return true for ExtensionInfo object', () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: 'test-extension',
        manageSdpEnabled: true,
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it('should return false for ExtensionError object', () => {
      const extensionError: ExtensionError = {
        lastError: {
          errorMessage: 'Test error',
          time: '2023-01-01T00:00:00Z',
        },
      };

      expect(isExtensionInfo(extensionError)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe('byKey', () => {
    it('should return -1 when a.key < b.key', () => {
      const a: KeyedNavLink = { key: 'a', name: 'A' };
      const b: KeyedNavLink = { key: 'b', name: 'B' };

      expect(byKey(a, b)).toBe(-1);
    });

    it('should return 1 when a.key > b.key', () => {
      const a: KeyedNavLink = { key: 'b', name: 'B' };
      const b: KeyedNavLink = { key: 'a', name: 'A' };

      expect(byKey(a, b)).toBe(1);
    });

    it('should return 0 when a.key === b.key', () => {
      const a: KeyedNavLink = { key: 'a', name: 'A' };
      const b: KeyedNavLink = { key: 'a', name: 'A' };

      expect(byKey(a, b)).toBe(0);
    });
  });

  describe('toNavLink', () => {
    it('should convert ExtensionInfo to KeyedNavLink', () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: 'test-extension',
        manageSdpEnabled: true,
      };

      const expected: KeyedNavLink = {
        key: 'test-extension',
        name: 'test-extension',
        url: '',
      };

      expect(toNavLink(extensionInfo)).toEqual(expected);
    });
  });

  describe('when', () => {
    it('should return args when condition is true', () => {
      expect(when(true, 1, 2, 3)).toEqual([1, 2, 3]);
    });

    it('should return empty array when condition is false', () => {
      expect(when(false, 1, 2, 3)).toEqual([]);
    });

    it('should work with different types', () => {
      expect(when(true, 'a', 'b')).toEqual(['a', 'b']);
      expect(when(false, 'a', 'b')).toEqual([]);
    });
  });
});
