import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { CalenderIcon, ReportDownloadIcon } from "../SvgIcons/IconSvg";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { Dropdown } from "react-native-element-dropdown";
import Chart from "../Components/Chart";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];

export default function PLScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [value, setValue] = useState({ label: "Last Week 1", value: "1" });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateTyppe, setDateTyppe] = useState("start");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleConfirm = (date) => {
    if (dateTyppe == "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
    setDateTyppe("start");
  };

  const RenderRow = ({ title, rs, pr }) => {
    return (
      <View style={styles.salesRow}>
        <Text style={styles.leftTextRow}>{title}</Text>
        <Text style={styles.middleText}>{rs}</Text>
        <Text style={styles.rightText}>{pr}</Text>
      </View>
    );
  };

  return (
    <View style={ApplicationStyles.containerPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header  */}
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.topTitle}>
                Kajani Exim LLP
              </Text>
              <Text style={styles.descriptionHeader}>
                Profit and losses report
              </Text>
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
          <View style={styles.datePickerMainView}>
            <TouchableOpacity
              onPress={() => {
                setIsDatePickerVisible(true), setDateTyppe("start");
              }}
              style={styles.dateView}
            >
              <Text style={styles.dateText}>
                {startDate !== ""
                  ? moment(startDate).format("MM/DD/YY")
                  : "Select -"}
              </Text>
              <CalenderIcon />
            </TouchableOpacity>
            <Text style={styles.toText}>to</Text>
            <TouchableOpacity
              onPress={() => {
                setIsDatePickerVisible(true), setDateTyppe("end");
              }}
              style={styles.dateView}
            >
              <Text style={styles.dateText}>
                {endDate !== ""
                  ? moment(endDate).format("MM/DD/YY")
                  : "Select -"}
              </Text>
              <CalenderIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={ApplicationStyles.chartCardWithourPadding}>
          <View style={styles.headingRow}>
            <Text style={styles.topTitle}>Income</Text>
          </View>
          <View style={styles.salesRow}>
            <Text style={styles.leftText}>Sales</Text>
            <Text style={styles.leftText}>₹ 50,00,000.00</Text>
          </View>
          <View style={styles.netIncomRow}>
            <Text style={styles.netIncomText}>Net Income</Text>
            <Text style={styles.netIncomText}>₹ 50,00,000.00</Text>
          </View>
        </View>
        <View style={ApplicationStyles.chartCardWithourPadding}>
          <View style={styles.headingRow}>
            <Text style={styles.topTitle}>Cost Of Goods Sold</Text>
          </View>
          <RenderRow title={"COGS"} rs={"₹ 25,00,000"} pr={"8%"} />
        </View>

        <View style={ApplicationStyles.chartCardWithourPadding}>
          <View style={styles.headingRow}>
            <Text style={styles.topTitle}>Expenses</Text>
          </View>
          <RenderRow title={"Commission"} rs={"₹ 10,00,000"} pr={"8%"} />
          <RenderRow title={"Shipping fee"} rs={"₹ 5,00,000"} pr={"7%"} />
          <RenderRow title={"Collection Free"} rs={"₹ 30,00,000"} pr={"6%"} />
          <RenderRow title={"Fixed Fee"} rs={"₹ 80,00,000"} pr={"7%"} />
          <View style={styles.netExpenseRow}>
            <Text style={styles.leftTextExpense}>{"Net Expenses"}</Text>
            <Text style={styles.middleTextExpense}>{"₹ 1,50,00,000"}</Text>
            <Text style={styles.rightTextExpense}>{"22%"}</Text>
          </View>
        </View>
        <View style={styles.grossProfitView}>
          <View style={styles.grossRow}>
            <Text style={styles.profitText}>Gross Profit</Text>
            <Text style={styles.profitRsText}>50,00,000</Text>
          </View>
          <View style={[styles.grossRow, { paddingTop: hp(1.5) }]}>
            <Text style={styles.profitText}>Gross Profit %</Text>
            <Text style={styles.profitRsText}>10%</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            let url =
              "whatsapp://send?text=" + "Hello" + "&phone=91" + "7568547177";
            Linking.openURL(url)
              .then((data) => {
                console.log("WhatsApp Opened");
              })
              .catch(() => {
                alert("Make sure Whatsapp installed on your device");
              });
          }}
          style={styles.reportBtn}
        >
          <ReportDownloadIcon />
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
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
  datePickerMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
  },
  dateView: {
    backgroundColor: Colors.dropDownBgColor,
    borderRadius: 10,
    flexDirection: "row",
    width: "44%",
    justifyContent: "space-between",
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1.5),
    alignItems: "center",
  },
  dateText: { ...commonFontStyle(400, 14, Colors.grayFont) },
  toText: { ...commonFontStyle(400, 16, Colors.blueOpacityFont) },
  headingRow: {
    paddingTop: hp(2),
    paddingBottom: hp(1),
    paddingHorizontal: hp(2),
  },
  salesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(2),
    marginBottom: hp(1.2),
  },
  leftText: { ...commonFontStyle(400, 14, Colors.blueOpacity_8Font) },
  netIncomRow: {
    backgroundColor: Colors.lightGreenBgColor,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(2) - 5,
    paddingVertical: hp(1.5),
  },
  netIncomText: {
    ...commonFontStyle(500, 16, Colors.green),
  },
  leftTextRow: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    width: "43%",
  },
  middleText: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    width: "45%",
  },
  rightText: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    width: "11%",
    textAlign: "right",
  },
  leftTextExpense: {
    ...commonFontStyle(500, 16, Colors.red),
    width: "43%",
  },
  middleTextExpense: {
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
    width: "45%",
  },
  rightTextExpense: {
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
    width: "11%",
    textAlign: "right",
  },
  netExpenseRow: {
    backgroundColor: Colors.lightRedBgColor,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(2) - 5,
    paddingVertical: hp(1.5),
  },
  grossProfitView: {
    backgroundColor: "#EBF2FF",
    borderWidth: 1,
    borderColor: Colors.blue,
    marginTop: hp(2),
    padding: hp(2),
    borderRadius: 10,
  },
  profitText: {
    ...commonFontStyle(600, 18, Colors.darkBlueFont),
  },
  profitRsText: {
    ...commonFontStyle(600, 18, Colors.blue),
  },
  grossRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    ...commonFontStyle(500, 14, Colors.grayFont),
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
  },
  reportBtn: {
    backgroundColor: Colors.darkBlueFont,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2),
    borderRadius: 10,
    paddingVertical: hp(1.2),
    paddingHorizontal: hp(3),
    marginBottom: hp(6),
  },
  reportText: { ...commonFontStyle(500, 12, Colors.white), marginLeft: hp(2) },
});
