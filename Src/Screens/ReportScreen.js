import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  ProfitReportIcon,
  ReturnIcon,
  ReturnReportIcon,
  RightArrowIcon,
  SalesReportIcon,
} from "../SvgIcons/IconSvg";

export default function ReportScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const RenderRow = ({ name, action }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ReportDetailScreen")}
        style={styles.row}
      >
        <Text style={styles.rowText}>{name}</Text>
        <RightArrowIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={ApplicationStyles.containerPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.chartCard}>
          <Text numberOfLines={1} style={styles.topTitle}>
            Kajani Exim LLP
          </Text>
          <Text style={styles.descriptionHeader}>Reports</Text>
        </View>
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.headerTitleView}>
            <Text numberOfLines={1} style={styles.topTitle}>
              Sales Reports
            </Text>
            <SalesReportIcon />
          </View>
          <RenderRow name={"Top Selling SKUs"} />
          <View style={styles.horizontalLine}></View>
          <RenderRow name={"Top Selling Category"} />
          <View style={styles.horizontalLine}></View>
          <RenderRow name={"Slow Selling SKUs"} />
        </View>
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.headerTitleView}>
            <Text numberOfLines={1} style={styles.topTitle}>
              Profit Reports
            </Text>
            <ProfitReportIcon />
          </View>
          <RenderRow name={"Most Profitable SKUs"} />
          <View style={styles.horizontalLine}></View>
          <RenderRow name={"Category Profitability"} />
        </View>
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.headerTitleView}>
            <Text numberOfLines={1} style={styles.topTitle}>
              Return Reports
            </Text>
            <ReturnReportIcon />
          </View>
          <RenderRow name={"Most Returned SKUs"} />
          <View style={styles.horizontalLine}></View>
          <RenderRow name={"SKUs with highest return charges"} />
          <View style={styles.horizontalLine}></View>
          <RenderRow name={"Category wise return %"} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topTitle: {
    ...commonFontStyle(600, 18, Colors.darkBlueFont),
    marginRight: 5,
  },
  descriptionHeader: {
    ...commonFontStyle(500, 16, Colors.blueOpacityFont),
  },
  headerTitleView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  rowText: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    paddingTop: hp(1.2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Colors.deviderLine,
    marginTop: hp(1.2),
  },
});
