import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { BackIcon } from "../SvgIcons/IconSvg";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

export default function Header({ isBackShow, isLogoutShow }) {
  const { goBack } = useNavigation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View>
      <SafeAreaView />
      <View style={style.container}>
        {isBackShow && (
          <TouchableOpacity
            onPress={() => goBack()}
            style={style.backIconStyle}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        <Image
          resizeMode="contain"
          style={style.logoHeader}
          source={require("../Images/invi_logo.png")}
        />
        {isLogoutShow && (
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              dispatch({ type: "LOGOUT", payload: {} });
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "LoginScreen" }],
                })
              );
            }}
            style={style.logoutButtonStyle}
          >
            <Image
              source={require("../Icons/logout.png")}
              style={{
                height: heightPercentageToDP(2.5),
                width: heightPercentageToDP(2.5),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  logoHeader: {
    height: 32,
    width: 154,
    alignSelf: "center",
  },
  container: {
    marginVertical: 15,
    justifyContent: "center",
  },
  backIconStyle: {
    position: "absolute",
    paddingVertical: 10,
    paddingRight: 25,
  },
  logoutButtonStyle: {
    position: "absolute",
    right: 0,
    paddingVertical: 10,
    paddingLeft: 25,
  },
});
