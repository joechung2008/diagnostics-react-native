import { StyleSheet } from 'react-native';

export const useAppTabHeadersStyles = (colors: any) => {
  return StyleSheet.create({
    tabList: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
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
      fontWeight: '600',
      color: colors.primary,
    },
  });
};
