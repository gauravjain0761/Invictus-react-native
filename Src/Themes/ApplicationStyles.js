import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default StyleSheet.create({
  applicationView: {
    flex: 1,
  },
  containerPadding: {
    flex: 1,
    backgroundColor: Colors.textInputBgColor,
    paddingHorizontal: hp(2),
  },
  chartCard: {
    backgroundColor: Colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    // marginTop: hp(1),
    borderRadius: 10,
  },
  reportContainer: {
    padding: hp(2),
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginTop: hp(2),
    flexDirection: "row",
  },
  chartCardWithourPadding: {
    backgroundColor: Colors.white,
    // paddingVertical: hp(2),
    // paddingHorizontal: hp(2),
    marginTop: hp(2),
    borderRadius: 10,
  },
});
