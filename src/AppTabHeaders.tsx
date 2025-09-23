import { useTheme } from '@/ThemeContext';
import { useAppTabHeadersStyles } from '@/hooks/useAppTabHeadersStyles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AppTabHeadersProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  showList: boolean;
  setShowList: (show: boolean) => void;
}

const AppTabHeaders: React.FC<AppTabHeadersProps> = ({
  selectedTab,
  setSelectedTab,
  setShowList,
  showList,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = useAppTabHeadersStyles(colors);

  return (
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
  );
};

export default AppTabHeaders;
