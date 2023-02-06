import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import Colors from "../Themes/Colors";

const Loader = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <Modal visible={true} transparent={true}>
      <View style={style.containerStyle}>
        <ActivityIndicator
          style={style.loaderStyle}
          size={"large"}
          color={Colors.blue}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  loaderStyle: {},
});

export default Loader;
