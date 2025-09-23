export type Environment = (typeof Environment)[keyof typeof Environment];

export const Environment = {
  Public: 'https://hosting.portal.azure.net/api/diagnostics',
  Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
  Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
} as const;

export function getEnvironmentName(
  environment: Environment | undefined,
): string {
  switch (environment) {
    case Environment.Public:
      return 'Public Cloud';
    case Environment.Fairfax:
      return 'Fairfax';
    case Environment.Mooncake:
      return 'Mooncake';
    default:
      return 'Select environment';
  }
}
