import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import {
  HomeIcon,
  AccountIcon,
  AccountsIcon,
  BellIcon,
  MoreIcon,
  UserIcon,
} from "components/Icon";

//import AttendanceScreen from 'screens/AttendanceScreen';
//import QuestionnaireScreen from 'screens/Posts/QuestionnaireScreen';

import PostStack from "./PostStack";

//import useMyUser from "hooks/use-my-user";
//import useNetwork from "hooks/use-network";
import useNotifications from "hooks/use-notifications";
import usePushNotifications from "hooks/use-push-notifications";
import useTheme from "hooks/use-theme";

import { ScreenConstants, TabScreenConstants, TypeConstants } from "constants";
import HomeStack from "./HomeStack";
import MyUserStack from "./MyUserStack";
import NotificationsStack from "./NotificationsStack";
import MoreStack from "./MoreStack";

export const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  // subscribe to push notifications
  /*
   * NOTE: we include here rather than `use-app` in order to be under the Redux
   * Provider Context (this hook depends on other hooks which depend on Redux)
   */
  usePushNotifications();

  const { isDarkMode, theme } = useTheme();
  const { hasNotifications } = useNotifications();
  //const { data: userData } = useMyUser();
  //const { isConnected } = useNetwork();

  /*
  // TODO: is this still necessary?
  useEffect(() => {
    if (!userData?.locale) return;
    if (isConnected) {
      if (userData.locale !== i18n?.locale) {
        setLocale(userData.locale);
      }
    }
    return;
  }, [userData?.locale]);
  */

  const indicatorStyle = (focused) => {
    if (focused)
      return {
        top: -10,
        height: 3,
        backgroundColor: isDarkMode ? theme.highlight : theme.brand.primary,
      };
    return null;
  };

  return (
    <Tab.Navigator
      initialRouteName={TabScreenConstants.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: isDarkMode
          ? theme.highlight
          : theme.brand.primary,
        tabBarStyle: {
          // NOTE: no longer necessary bc handled automatically when 'I18nManager.isRTL' is set
          //transform: isRTL ? [{scaleX: -1}] : null,
          backgroundColor: theme.background.primary,
          borderTopColor: theme.divider,
          display: [
            ScreenConstants.PIN,
            ScreenConstants.COMMENTS_ACTIVITY,
          ].includes(getFocusedRouteNameFromRoute(route))
            ? "none"
            : "flex",
        },
        tabBarButton: [ScreenConstants.PIN].includes(route?.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen
        name={TabScreenConstants.HOME}
        component={HomeStack}
        options={{
          tabBarShowLabel: false,
          //tabBarLabel: i18n.t("global.home"),
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <HomeIcon style={{ color }} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.HOME,
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen
        name={TabScreenConstants.CONTACTS}
        component={PostStack}
        initialParams={{
          type: TypeConstants.CONTACT,
        }}
        options={{
          //unmountOnBlur: true,
          tabBarShowLabel: false,
          //tabBarLabel: i18n.t("global.contacts"),
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <AccountIcon style={{ color }} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.CONTACTS,
                  params: {
                    screen: ScreenConstants.LIST,
                    type: TypeConstants.CONTACT,
                  },
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen
        name={TabScreenConstants.GROUPS}
        component={PostStack}
        initialParams={{
          type: TypeConstants.GROUP,
        }}
        options={{
          tabBarShowLabel: false,
          //tabBarLabel: i18n.t("global.groups"),
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <AccountsIcon style={{ color }} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.GROUPS,
                  params: {
                    screen: ScreenConstants.LIST,
                    type: TypeConstants.GROUP,
                  },
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen
        name={TabScreenConstants.MY_USER}
        component={MyUserStack}
        initialParams={{
          type: TypeConstants.MY_USER,
        }}
        options={{
          //unmountOnBlur: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <UserIcon style={{ color }} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.MY_USER,
                  params: {
                    screen: ScreenConstants.MY_USER,
                    type: TypeConstants.MY_USER,
                  },
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen
        name={TabScreenConstants.NOTIFICATIONS}
        component={NotificationsStack}
        options={{
          tabBarShowLabel: false,
          //tabBarLabel: i18n.t("global.notifications"),
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <BellIcon style={{ color }} />
            </View>
          ),
          tabBarBadge: hasNotifications ? "" : null,
          tabBarBadgeStyle: {
            marginTop: 5,
            marginStart: 7,
            minWidth: 10,
            maxHeight: 10,
            borderRadius: 5,
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.NOTIFICATIONS,
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen
        name={TabScreenConstants.MORE}
        component={MoreStack}
        options={{
          tabBarShowLabel: false,
          //tabBarLabel: i18n.t("global.more"),
          tabBarIcon: ({ focused, color }) => (
            <View>
              <View style={indicatorStyle(focused)} />
              <MoreIcon style={{ color }} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: TabScreenConstants.MORE,
                },
              ],
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.i18n?.locale === nextProps.i18n?.locale &&
    prevProps.theme?.mode === nextProps.theme?.mode &&
    prevProps.theme?.brand?.primary === nextProps.theme?.brand?.primary
  );
};
export default React.memo(TabNavigator, areEqual);
