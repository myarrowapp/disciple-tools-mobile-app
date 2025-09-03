import React, { useMemo } from "react";

import { Stack } from "./TabNavigator";

import useTheme from "hooks/use-theme";
import useI18N from "hooks/use-i18n";

import { ScreenConstants, TypeConstants } from "constants";

import MyUserScreen from "screens/MyUserScreen";
import CommentsActivityScreen from "screens/Posts/CommentsActivityScreen";
import DetailsScreen from "screens/Posts/DetailsScreen";
import PINScreen from "screens/PINScreen";
import StorageScreen from "screens/StorageScreen";

export default function MyUserStack({ route }) {
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
        name={ScreenConstants.MY_USER}
        component={MyUserScreen}
        //options={{
        //mode: "modal",
        //cardStyle: {
        //  backgroundColor:"transparent",
        //  opacity: 0.99
        //}
        //}}
        options={{
          title: "",
        }}
        initialParams={{
          type: TypeConstants.MY_USER,
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
        name={ScreenConstants.PIN}
        options={{
          title: null,
          //headerBackTitle: i18n.t("global.settings"),
        }}
      >
        {(props) => <PINScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name={ScreenConstants.STORAGE}
        options={{
          title: i18n.t("global.storage"),
        }}
      >
        {(props) => <StorageScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
