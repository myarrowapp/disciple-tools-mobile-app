import React, { useMemo } from "react";
import { ScreenConstants, TabScreenConstants, TypeConstants } from "constants";

import { Stack } from "./TabNavigator";

import useTheme from "hooks/use-theme";

import HomeScreen from "screens/HomeScreen";
import AllActivityLogsScreen from "screens/AllActivityLogsScreen";
import PostStack from "./PostStack";

export default function HomeStack() {
  const { isDarkMode, theme } = useTheme();
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
      <Stack.Screen name={TabScreenConstants.HOME} component={HomeScreen} />
      <Stack.Screen
        name={ScreenConstants.ALL_ACTIVITY_LOGS}
        component={AllActivityLogsScreen}
      />
      <Stack.Screen
        name={TabScreenConstants.CONTACTS}
        component={PostStack}
        initialParams={{
          type: TypeConstants.CONTACT,
        }}
      />
      <Stack.Screen
        name={TabScreenConstants.GROUPS}
        component={PostStack}
        initialParams={{
          type: TypeConstants.GROUP,
        }}
      />
    </Stack.Navigator>
  );
}
