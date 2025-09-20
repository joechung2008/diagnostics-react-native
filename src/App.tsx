import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import BuildInfo from './BuildInfo';
import Extension from './Extension';
import Extensions from './Extensions';
import ServerInfo from './ServerInfo';
import { isExtensionInfo } from './utils';
import { ThemeProvider, useTheme } from './ThemeContext';

type Environment = (typeof Environment)[keyof typeof Environment];

const Environment = {
  Public: 'https://hosting.portal.azure.net/api/diagnostics',
  Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
  Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
} as const;

function getEnvironmentName(environment: Environment | undefined): string {
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

const AppContent: React.FC = () => {
  const { colors } = useTheme();

  const dynamicStyles = {
    flexbox: {
      flex: 1,
      flexDirection: 'column' as const,
      backgroundColor: colors.background,
      ...(Platform.OS === 'web'
        ? { height: '100vh' as any }
        : { height: Dimensions.get('window').height }),
      position: 'relative' as const,
    },
    toolbar: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      minHeight: 44,
      padding: 10,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    environmentButton: {
      alignSelf: 'center' as const,
      padding: 10,
      minWidth: 120,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 4,
    },
    toolbarRight: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    },
    environmentButtonText: {
      fontSize: 14,
      color: colors.text,
    },
    environmentDropdown: {
      position: 'absolute' as const,
      top: 50,
      left: 10,
      right: 10,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 4,
      zIndex: 1000,
      maxHeight: 200,
      minHeight: 50,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    environmentOption: {
      padding: 14,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSecondary,
    },
    environmentOptionLast: {
      borderBottomWidth: 0,
    },
    environmentOptionText: {
      fontSize: 16,
      color: colors.text,
    },
    toolbarButton: {
      padding: 16,
    },
    toolbarButtons: {
      display: 'flex' as const,
      flexDirection: 'row' as const,
    },
    toolbarButtonText: {
      fontSize: 14,
      color: colors.primary,
    },
    tabList: {
      flexDirection: 'row' as const,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      alignItems: 'center' as const,
      padding: 16,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabSelected: {
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    tabTextSelected: {
      fontWeight: '600' as const,
      color: colors.primary,
    },
    tabPanel: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: 'hidden' as const,
    },
    tabPanelPending: {
      alignItems: 'center' as const,
      flex: 1,
      justifyContent: 'center' as const,
      backgroundColor: colors.background,
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center' as const,
      color: colors.error,
    },
    dropdownOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public,
  );
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEnvironmentPicker, setShowEnvironmentPicker] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(environment);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch diagnostics: ${response.statusText}`,
          );
        }
        const data = await response.json();
        setDiagnostics(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagnostics();
  }, [environment]);

  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>('extensions');
  const [showList, setShowList] = useState<boolean>(true);

  const handleLinkClick: ExtensionsProps['onLinkClick'] = useCallback(
    (_, item) => {
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

  return (
    <View style={dynamicStyles.flexbox}>
      <View style={dynamicStyles.toolbar}>
        <TouchableOpacity
          style={dynamicStyles.environmentButton}
          onPress={() => setShowEnvironmentPicker(!showEnvironmentPicker)}
        >
          <Text style={dynamicStyles.environmentButtonText}>
            {getEnvironmentName(environment)} 🔽
          </Text>
        </TouchableOpacity>
        <View style={dynamicStyles.toolbarRight}>
          {showPaasServerless && (
            <TouchableOpacity
              style={dynamicStyles.toolbarButton}
              onPress={handlePaasServerlessPress}
            >
              <Text style={dynamicStyles.toolbarButtonText}>
                paasserverless
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={dynamicStyles.toolbarButton}
            onPress={handleWebsitesPress}
          >
            <Text style={dynamicStyles.toolbarButtonText}>websites</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showEnvironmentPicker && (
        <>
          <TouchableOpacity
            style={dynamicStyles.dropdownOverlay}
            onPress={() => setShowEnvironmentPicker(false)}
            activeOpacity={1}
          />
          <View style={dynamicStyles.environmentDropdown}>
            {Object.entries(Environment).map(([key, value], index, array) => (
              <TouchableOpacity
                key={key}
                style={[
                  dynamicStyles.environmentOption,
                  index === array.length - 1 &&
                    dynamicStyles.environmentOptionLast,
                ]}
                onPress={() => handleEnvironmentChange(value)}
              >
                <Text style={dynamicStyles.environmentOptionText}>
                  {getEnvironmentName(value)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={dynamicStyles.tabList}>
        {[
          {
            value: 'extensions',
            label: 'Extensions',
            emoji: showList ? '📋' : '📊',
          },
          { value: 'build', label: 'Build Info' },
          { value: 'server', label: 'Server Info' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.value}
            style={[
              dynamicStyles.tab,
              selectedTab === tab.value && dynamicStyles.tabSelected,
            ]}
            onPress={() => {
              if (tab.value === 'extensions' && selectedTab === 'extensions') {
                setShowList(!showList);
              } else {
                setSelectedTab(tab.value);
              }
            }}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                selectedTab === tab.value && dynamicStyles.tabTextSelected,
              ]}
              accessibilityLabel={
                tab.emoji
                  ? `${tab.label} ${showList ? 'List view' : 'Details view'}`
                  : tab.label
              }
            >
              {tab.label}
              {tab.emoji ? ` ${tab.emoji}` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {(() => {
        if (isLoading) {
          return (
            <View style={dynamicStyles.tabPanelPending}>
              <ActivityIndicator
                size="large"
                accessibilityLabel="Loading diagnostics..."
              />
            </View>
          );
        }

        if (error) {
          return (
            <View style={dynamicStyles.tabPanel}>
              <Text style={dynamicStyles.errorText}>
                Error loading diagnostics: {error.message}
              </Text>
            </View>
          );
        }

        if (selectedTab === 'extensions' && diagnostics?.extensions) {
          return (
            <View style={dynamicStyles.tabPanel}>
              {showList ? (
                <Extensions
                  extensions={diagnostics.extensions}
                  onLinkClick={handleLinkClick}
                />
              ) : extension ? (
                <Extension {...extension} />
              ) : (
                <View style={dynamicStyles.tabPanel}>
                  <Text style={dynamicStyles.errorText}>
                    Select an extension to view details
                  </Text>
                </View>
              )}
            </View>
          );
        }

        if (selectedTab === 'build' && diagnostics?.buildInfo) {
          return (
            <View style={dynamicStyles.tabPanel}>
              <BuildInfo {...diagnostics.buildInfo} />
            </View>
          );
        }

        if (selectedTab === 'server' && diagnostics?.serverInfo) {
          return (
            <View style={dynamicStyles.tabPanel}>
              <ServerInfo {...diagnostics.serverInfo} />
            </View>
          );
        }

        return null;
      })()}
    </View>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
