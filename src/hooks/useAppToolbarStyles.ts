export const useAppToolbarStyles = (colors: any) => {
  return {
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
    toolbarButtonText: {
      fontSize: 14,
      color: colors.primary,
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
};
