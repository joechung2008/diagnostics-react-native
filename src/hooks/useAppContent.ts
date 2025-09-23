import { Environment } from '@/lib/environment';
import { fetchDiagnostics, isExtensionInfo } from '@/lib/utils';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

export const useAppContent = () => {
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public,
  );
  const [showEnvironmentPicker, setShowEnvironmentPicker] = useState(false);
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>('extensions');
  const [showList, setShowList] = useState<boolean>(true);

  const {
    data: diagnostics,
    error,
    isLoading: pending,
  } = useSWR(environment, () => fetchDiagnostics(environment));

  const handleLinkClick: ExtensionsProps['onLinkClick'] = useCallback(
    (item: KeyedNavLink) => {
      if (item) {
        const $extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo($extension)) {
          setExtension($extension);
          setShowList(false);
        }
      }
    },
    [diagnostics?.extensions],
  );

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions?.paasserverless),
    [diagnostics?.extensions],
  );

  const handleEnvironmentChange = useCallback((value: Environment) => {
    setEnvironment(value);
    setExtension(undefined);
    setSelectedTab('extensions');
    setShowList(true);
    setShowEnvironmentPicker(false);
  }, []);

  const handlePaasServerlessPress = useCallback(() => {
    const paasserverless = diagnostics?.extensions?.paasserverless;
    if (isExtensionInfo(paasserverless)) {
      setExtension(paasserverless);
      setShowList(false);
      setSelectedTab('extensions');
    }
  }, [diagnostics?.extensions]);

  const handleWebsitesPress = useCallback(() => {
    const websites = diagnostics?.extensions?.websites;
    if (isExtensionInfo(websites)) {
      setExtension(websites);
      setShowList(false);
      setSelectedTab('extensions');
    }
  }, [diagnostics?.extensions]);

  return {
    diagnostics,
    environment,
    error,
    extension,
    pending,
    selectedTab,
    setSelectedTab,
    setShowEnvironmentPicker,
    setShowList,
    showEnvironmentPicker,
    showList,
    showPaasServerless,
    handleEnvironmentChange,
    handleLinkClick,
    handlePaasServerlessPress,
    handleWebsitesPress,
  };
};
