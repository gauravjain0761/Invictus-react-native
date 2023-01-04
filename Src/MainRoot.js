import "./Config";
import React, { useEffect, useState, useCallback, useRef } from "react";
import RootContainer from "./Navigation/RootContainer";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ApplicationStyles from "./Themes/ApplicationStyles";
import { useSelector } from "react-redux";
import Colors from "./Themes/Colors";

function MainRoot() {
  const preLoader = useSelector((e) => e.common.preLoader);

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);

  return (
    <View style={ApplicationStyles.applicationView}>
      <RootContainer />
      {/* {preLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={Colors.black} />
        </View>
      )} */}
    </View>
  );
}
export default MainRoot;

const styles = StyleSheet.create({
  loaderView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
