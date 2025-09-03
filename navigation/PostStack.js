import React, { useMemo } from "react";

import useTheme from "hooks/use-theme";
import useI18N from "hooks/use-i18n";
import { Stack } from "./TabNavigator";
import { ScreenConstants, TypeConstants } from "constants";

import ListScreen from "screens/Posts/ListScreen";
import DetailsScreen from "screens/Posts/DetailsScreen";
import CreateScreen from "screens/Posts/CreateScreen";
import ImportContactsScreen from "screens/Posts/ImportContactsScreen";
import CommentsActivityScreen from "screens/Posts/CommentsActivityScreen";

export default function PostStack({ route }) {
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
        name={ScreenConstants.LIST}
        component={ListScreen}
        //options={{ headerShown: false }}
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
        //options={{ presentation: 'card' }}
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
        name={ScreenConstants.IMPORT}
        component={ImportContactsScreen}
        options={{
          // TODO:better title term
          title: i18n.t("global.importContact"),
        }}
        initialParams={{
          type: TypeConstants.CONTACT,
        }}
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
