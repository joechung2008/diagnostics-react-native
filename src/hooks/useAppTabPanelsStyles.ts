import { StyleSheet } from 'react-native';

export const useAppTabPanelsStyles = (colors: any) => {
  return StyleSheet.create({
    tabPanel: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.error,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.error,
      marginBottom: 10,
      textAlign: 'center',
    },
    errorMessage: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
};
