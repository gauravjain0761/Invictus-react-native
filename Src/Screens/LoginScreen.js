import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../Themes/ApplicationStyles";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { EyePassword, LogoLoginScreen } from "../SvgIcons/IconSvg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={ApplicationStyles.applicationView}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../Images/loginBackgroung.png")}
        ></ImageBackground>
        <View style={styles.bottomView}>
          <View style={styles.logoLOgin}>
            <LogoLoginScreen />
          </View>
          <View style={styles.loginView}>
            <Text style={styles.titleStyle}>
              Let's <Text style={styles.secondTitle}>Login</Text>
            </Text>
            <View>
              <Text style={styles.textInputTitle}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder={"Enter Email Id"}
                placeholderTextColor={Colors.placeholderGray}
              />
            </View>
            <View>
              <Text style={styles.textInputTitle}>Password</Text>
              <View style={styles.passwordInputView}>
                <TextInput
                  style={styles.textInputPwd}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder={"Enter Password"}
                  placeholderTextColor={Colors.placeholderGray}
                  secureTextEntry={isPasswordSecure}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                >
                  <EyePassword />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("BottomTab")}
              style={styles.loginbtn}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  imageBackground: {
    height: "80%",
    width: SCREEN_WIDTH,
    resizeMode: "cover",
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  logoLOgin: {
    alignItems: "center",
  },
  loginView: {
    backgroundColor: Colors.white,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingVertical: hp(3),
    paddingHorizontal: hp(2),
    marginTop: hp(10),
    backgroundColor: Colors.white,
  },
  titleStyle: {
    ...commonFontStyle(400, 30, Colors.darkBlueFont),
    marginBottom: hp(4),
  },
  secondTitle: {
    ...commonFontStyle(600, 30, Colors.darkBlueFont),
  },
  textInputTitle: {
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
  },
  textInput: {
    height: hp(7),
    borderWidth: 1,
    borderColor: Colors.placeholderGray,
    ...commonFontStyle(400, 14, Colors.darkBlueFont),
    borderRadius: 10,
    marginBottom: hp(1.5),
    marginTop: 6,
    padding: hp(2),
    backgroundColor: Colors.textInputBgColor,
  },
  passwordInputView: {
    borderWidth: 1,
    borderColor: Colors.placeholderGray,
    ...commonFontStyle(400, 14, Colors.darkBlueFont),
    borderRadius: 10,
    marginBottom: hp(1.5),
    marginTop: 6,
    backgroundColor: Colors.textInputBgColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
  },
  textInputPwd: {
    height: hp(7),
    flex: 1,
    marginRight: 10,
    ...commonFontStyle(400, 14, Colors.darkBlueFont),
  },
  loginbtn: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    height: hp(7),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(6),
    marginBottom: hp(2),
  },
  loginButtonText: {
    ...commonFontStyle(500, 18, Colors.white),
  },
});
