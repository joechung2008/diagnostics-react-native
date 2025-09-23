import { useTheme } from '@/ThemeContext';
import { useAppTabPanelsStyles } from '@/hooks/useAppTabPanelsStyles';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import BuildInfo from './BuildInfo';
import Extension from './Extension';
import Extensions from './Extensions';
import ServerInfo from './ServerInfo';

interface AppTabPanelsProps {
  diagnostics: any;
  error?: Error;
  extension?: ExtensionInfo;
  pending: boolean;
  selectedTab: string;
  showList: boolean;
  handleLinkClick: (item?: KeyedNavLink) => void;
}

const AppTabPanels: React.FC<AppTabPanelsProps> = ({
  diagnostics,
  error,
  extension,
  pending,
  selectedTab,
  showList,
  handleLinkClick,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = useAppTabPanelsStyles(colors);

  if (error) {
    return (
      <View style={dynamicStyles.errorContainer}>
        <Text style={dynamicStyles.errorTitle}>Something went wrong</Text>
        <Text style={dynamicStyles.errorMessage}>
          {error?.message ?? 'An unexpected error occurred'}
        </Text>
      </View>
    );
  }

  if (pending) {
    return (
      <View style={dynamicStyles.loadingContainer}>
        <ActivityIndicator size="large" />
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
            <View style={dynamicStyles.errorContainer}>
              <Text style={dynamicStyles.errorText}>
                Select an extension to view details
              </Text>
            </View>
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
};

export default AppTabPanels;
