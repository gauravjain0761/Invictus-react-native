import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BackIcon } from "../SvgIcons/IconSvg";

export default function Header({ isBackShow }) {
  const { goBack } = useNavigation();
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
  },
});
