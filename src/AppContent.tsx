import AppTabHeaders from '@/AppTabHeaders';
import AppTabPanels from '@/AppTabPanels';
import AppToolbar from '@/AppToolbar';
import { useAppContent } from '@/hooks/useAppContent';
import { useStyles } from '@/hooks/useAppStyles';
import { ThemeProvider, useTheme } from '@/ThemeContext';
import React from 'react';
import { View } from 'react-native';

const AppContent: React.FC = () => {
  const { colors } = useTheme();
  const dynamicStyles = useStyles(colors);

  const {
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
  } = useAppContent();

  return (
    <ThemeProvider>
      <View style={dynamicStyles.flexbox}>
        <AppToolbar
          environment={environment}
          setShowEnvironmentPicker={setShowEnvironmentPicker}
          showEnvironmentPicker={showEnvironmentPicker}
          showPaasServerless={showPaasServerless}
          handleEnvironmentChange={handleEnvironmentChange}
          handlePaasServerlessPress={handlePaasServerlessPress}
          handleWebsitesPress={handleWebsitesPress}
        />
        <AppTabHeaders
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setShowList={setShowList}
          showList={showList}
        />
        <AppTabPanels
          diagnostics={diagnostics}
          error={error}
          extension={extension}
          pending={pending}
          selectedTab={selectedTab}
          showList={showList}
          handleLinkClick={handleLinkClick}
        />
      </View>
    </ThemeProvider>
  );
};

export default AppContent;
