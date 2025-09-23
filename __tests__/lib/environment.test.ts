import { Environment, getEnvironmentName } from '@/lib/environment';

describe('environment', () => {
  describe('Environment', () => {
    it('should have correct URLs for all environments', () => {
      expect(Environment.Public).toBe(
        'https://hosting.portal.azure.net/api/diagnostics',
      );
      expect(Environment.Fairfax).toBe(
        'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
      );
      expect(Environment.Mooncake).toBe(
        'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
      );
    });
  });

  describe('getEnvironmentName', () => {
    it('should return correct names for all environments', () => {
      expect(getEnvironmentName(Environment.Public)).toBe('Public Cloud');
      expect(getEnvironmentName(Environment.Fairfax)).toBe('Fairfax');
      expect(getEnvironmentName(Environment.Mooncake)).toBe('Mooncake');
    });

    it('should return "Select environment" for undefined', () => {
      expect(getEnvironmentName(undefined)).toBe('Select environment');
    });

    it('should return "Select environment" for invalid environment', () => {
      expect(getEnvironmentName('invalid' as any)).toBe('Select environment');
    });
  });
});
