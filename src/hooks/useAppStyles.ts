import { Dimensions, Platform } from 'react-native';

export const useStyles = (colors: any) => {
  return {
    flexbox: {
      flex: 1,
      flexDirection: 'column' as const,
      backgroundColor: colors.background,
      ...(Platform.OS === 'web'
        ? { height: '100vh' as any }
        : { height: Dimensions.get('window').height }),
      position: 'relative' as const,
    },
  };
};
