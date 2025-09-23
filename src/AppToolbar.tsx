import { useAppToolbarStyles } from '@/hooks/useAppToolbarStyles';
import { Environment, getEnvironmentName } from '@/lib/environment';
import { useTheme } from '@/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AppToolbarProps {
  environment: Environment;
  setShowEnvironmentPicker: (show: boolean) => void;
  showEnvironmentPicker: boolean;
  showPaasServerless: boolean;
  handleEnvironmentChange: (value: Environment) => void;
  handlePaasServerlessPress: () => void;
  handleWebsitesPress: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({
  environment,
  setShowEnvironmentPicker,
  showEnvironmentPicker,
  showPaasServerless,
  handleEnvironmentChange,
  handlePaasServerlessPress,
  handleWebsitesPress,
}) => {
  const { colors } = useTheme();
  const dynamicStyles = useAppToolbarStyles(colors);

  return (
    <>
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
    </>
  );
};

export default AppToolbar;
