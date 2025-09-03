import React, { useMemo } from "react";

import useTheme from "hooks/use-theme";
import useI18N from "hooks/use-i18n";

import { ScreenConstants, TabScreenConstants } from "constants";

import { Stack } from "./TabNavigator";
import MoreScreen from "screens/MoreScreen";
import ListScreen from "screens/Posts/ListScreen";
import DetailsScreen from "screens/Posts/DetailsScreen";
import CreateScreen from "screens/Posts/CreateScreen";
import CommentsActivityScreen from "screens/Posts/CommentsActivityScreen";

export default function MoreStack({ route }) {
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
        name={TabScreenConstants.MORE}
        component={MoreScreen}
        options={{
          title: i18n.t("global.more"),
        }}
      />
      <Stack.Screen
        name={ScreenConstants.LIST}
        component={ListScreen}
        options={{
          title: "",
        }}
        initialParams={
          route?.params
            ? {
                ...route.params,
              }
            : null
        }
      />
      <Stack.Screen
        name={ScreenConstants.DETAILS}
        component={DetailsScreen}
        initialParams={
          route?.params
            ? {
                ...route.params,
              }
            : null
        }
      />
      <Stack.Screen
        name={ScreenConstants.CREATE}
        component={CreateScreen}
        //options={{
        //  ...TransitionPresets.ModalTransition,
        //}}
        initialParams={
          route?.params
            ? {
                ...route.params,
              }
            : null
        }
      />
      <Stack.Screen
        name={ScreenConstants.COMMENTS_ACTIVITY}
        component={CommentsActivityScreen}
        //options={{
        //  title: i18n.t("global.commentsActivity"),
        //  ...TransitionPresets.ModalTransition,
        //}}
        initialParams={
          route?.params
            ? {
                ...route.params,
              }
            : null
        }
      />
    </Stack.Navigator>
  );
}
