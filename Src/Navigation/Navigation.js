import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../Screens/DashboardScreen";
import LoginScreen from "../Screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PLScreen from "../Screens/PLScreen";
import ReportScreen from "../Screens/ReportScreen";
import LossesScreen from "../Screens/LossesScreen";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  BackIcon,
  DashboardTabIcon,
  LossesTabIcon,
  PLTabIcon,
  ReportTabIcon,
} from "../SvgIcons/IconSvg";
import Colors from "../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import ReportDetailScreen from "../Screens/ReportDetailScreen";

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderBottomColor: "red", borderBottomWidth: 2 }]
        : props.style
    }
  />
);
const data = {
  headerBackVisible: false,
  headerTitle: () => (
    <Image
      style={styles.logoHeader}
      source={require("../Images/headerLogo.png")}
    />
  ),
};

const transparentHeader = {
  headerStyle: {
    backgroundColor: Colors.textInputBgColor,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleAlign: "center",
  headerShadowVisible: false,
};

const ReportStack = createNativeStackNavigator();
function ReportNavigation() {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen
        options={{ ...transparentHeader, ...data }}
        component={ReportScreen}
        name={"ReportScreen"}
      />
      <ReportStack.Screen
        options={({ navigation }) => ({
          ...transparentHeader,
          ...data,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingVertical: 10,
                paddingRight: 20,
              }}
            >
              <BackIcon />
            </TouchableOpacity>
          ),
        })}
        component={ReportDetailScreen}
        name={"ReportDetailScreen"}
      />
    </ReportStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          borderTopWidth: 0,
          shadowRadius: 0,
          elevation: 0,
          paddingTop: 8,
          backgroundColor: Colors.white,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.tabIconGray,
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <DashboardTabIcon color={color} />;
          },
          ...transparentHeader,
          ...data,
          tabBarLabel: "Dashboard",
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <PLTabIcon color={color} />;
          },
          ...transparentHeader,
          ...data,
          tabBarLabel: "Profit Report",
        }}
        name="PLScreen"
        component={PLScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <ReportTabIcon color={color} />;
          },
          headerShown: false,
          tabBarLabel: "Reports",
        }}
        name="ReportNavigation"
        component={ReportNavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <LossesTabIcon color={color} />;
          },
          ...transparentHeader,
          ...data,
          tabBarLabel: "Losses",
          tabBarLabelStyle: {
            color: Colors.red,
            fontFamily: "Poppins-Medium",
            fontSize: 11,
          },
        }}
        name="LossesScreen"
        component={LossesScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTab"
          component={BottomTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logoHeader: {
    height: 32,
    // flex: 1,
    width: 154,
    // backgroundColor: "red",
    resizeMode: "contain",
  },
});
