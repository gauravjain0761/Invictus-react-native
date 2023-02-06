import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import {
  DownloadIcon,
  GrossProfitIcon,
  LogoLoginScreen,
  ReturnIcon,
  RupeeIcon,
  UnitIcon,
} from "../SvgIcons/IconSvg";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { Dropdown } from "react-native-element-dropdown";
import Chart from "../Components/Chart";
import NewChart from "../Components/NewChart";
import { getDetails } from "../Actions/authActions";
import Loader from "../Components/Loader";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];
export default function DashboardScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState({ label: "Last Week", value: "1" });
  const { allDetails } = useSelector((state) => state.common);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity>
        <View style={styles.downloadIcon}>
          <DownloadIcon />
        </View>
      </TouchableOpacity>
    ),
  });

  useEffect(() => {
    const request = {
      onSuccess: () => setIsLoading(false),
      onFail: () => setIsLoading(false),
    };
    dispatch(getDetails(request));
  }, []);

  return (
    <View style={ApplicationStyles.containerPadding}>
      <Loader visible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.topTitle}>
                Kajani Exim LLP
              </Text>
              <Text style={styles.descriptionHeader}>Sales</Text>
            </View>
            <View style={styles.dropdownView}>
              <Dropdown
                style={styles.tradetypeviewStyle}
                data={data}
                selectedTextStyle={[styles.TitleTextStyle]}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={value}
                placeholder={""}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={(item) => (
                  <View>
                    <Text style={styles.textItem}>{item.label}</Text>
                  </View>
                )}
                iconColor={Colors.grayFont}
              />
            </View>
          </View>
          {/* <Chart /> */}
          <NewChart />
        </View>
        <View style={styles.chartHeader}>
          <View style={styles.halfView}>
            <View style={ApplicationStyles.chartCard}>
              <View style={styles.rupeeIcon}>
                <RupeeIcon />
              </View>
              <Text style={styles.cardDes}>Total Sales</Text>
              <Text style={styles.rupees}>₹ 6,200</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <View style={ApplicationStyles.chartCard}>
              <View style={styles.unitIcon}>
                <UnitIcon />
              </View>
              <Text style={styles.cardDes}>Total Units</Text>
              <Text style={styles.rupees}>3,200</Text>
            </View>
          </View>
        </View>
        <View style={styles.chartHeader}>
          <View style={[styles.halfView, styles.buttonViewGross]}>
            <GrossProfitIcon />
            <Text
              style={{
                paddingLeft: 8,
                ...commonFontStyle(500, 16, Colors.white),
              }}
            >
              Gross Profit
            </Text>
          </View>
          <View style={[styles.halfView, styles.buttonViewReturn]}>
            <ReturnIcon />
            <Text
              style={{
                paddingLeft: 8,
                ...commonFontStyle(500, 16, Colors.blue),
              }}
            >
              Return %
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  downloadIcon: {
    height: 35,
    backgroundColor: Colors.darkBlueFont,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    borderRadius: 35 / 2,
    marginRight: hp(2),
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topTitle: {
    ...commonFontStyle(600, 18, Colors.darkBlueFont),
  },
  descriptionHeader: {
    ...commonFontStyle(500, 16, Colors.blueOpacityFont),
  },
  tradetypeviewStyle: {
    backgroundColor: Colors.dropDownBgColor,
    borderRadius: 100,
    paddingHorizontal: hp(2),
    paddingVertical: hp(0.2),
  },
  TitleTextStyle: {
    ...commonFontStyle(500, 12, Colors.blueOpacityFont),
  },
  heading: {
    width: "60%",
  },
  dropdownView: {
    width: "40%",
  },
  textItem: {
    ...commonFontStyle(500, 14, Colors.grayFont),
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
  },
  halfView: {
    width: (SCREEN_WIDTH - hp(6)) / 2,
  },
  rupeeIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: hp(6),
    height: hp(6),
    borderRadius: 10,
    marginBottom: hp(2),
    backgroundColor: Colors.yellow,
  },
  unitIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: hp(6),
    height: hp(6),
    borderRadius: 10,
    marginBottom: hp(2),
    backgroundColor: Colors.green,
  },
  cardDes: { ...commonFontStyle(500, 14, Colors.blueOpacityFont) },
  rupees: { ...commonFontStyle(600, 20, Colors.darkBlueFont) },
  buttonViewGross: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    paddingVertical: hp(1.5),
    marginTop: hp(2),
    backgroundColor: Colors.blue,
  },
  buttonViewReturn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    paddingVertical: hp(1.5),
    marginTop: hp(2),
    backgroundColor: Colors.returnBtnBgColor,
  },
});
