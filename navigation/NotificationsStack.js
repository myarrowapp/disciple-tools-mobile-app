import React, { useMemo } from "react";

import useTheme from "hooks/use-theme";
import useI18N from "hooks/use-i18n";

import { Stack } from "./TabNavigator";
import NotificationsScreen from "screens/NotificationsScreen";

import { TabScreenConstants, TypeConstants } from "constants";

export default function NotificationsStack() {
  const { isDarkMode, theme } = useTheme();
  const { i18n, setLocale } = useI18N();
  const screenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.background.primary,
        shadowColor: "transparent",
      },
      headerTintColor: theme.text.primary,
      headerBackTitleVisible: false,
      // use modals by default
      //gestureEnabled: true,
      //...TransitionPresets.ModalTransition,
    }),
    [theme]
  );
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={TabScreenConstants.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          title: i18n.t("global.notifications"),
        }}
        initialParams={{
          type: TypeConstants.NOTIFICATION,
        }}
      />
    </Stack.Navigator>
  );
}
