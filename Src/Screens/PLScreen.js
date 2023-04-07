import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Header from "../Components/Header";
import { numberWithCommas, plusNumberWithCommas } from "../Helper/global";

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
  const [indexDate, setIndexDate] = useState(0);

  const { allDetails, periodsList } = useSelector((state) => state.common);

  useEffect(() => {
    setValue(periodsList[indexDate]);
  }, []);

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
        <Text numberOfLines={1} style={styles.leftTextRow}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...styles.middleText, textAlign: "right" }}
        >
          {"₹ "}
          {rs}
        </Text>
        <Text numberOfLines={1} style={styles.rightText}>
          {pr}
          {"%"}
        </Text>
      </View>
    );
  };

  let netExpenses =
    allDetails?.pnl_report[indexDate].commission_fee +
    allDetails?.pnl_report[indexDate].shipping_fee +
    allDetails?.pnl_report[indexDate].reverse_shipping_fee +
    allDetails?.pnl_report[indexDate].collection_fee +
    allDetails?.pnl_report[indexDate].fixed_fee +
    allDetails?.pnl_report[indexDate].pick_and_pack_fee +
    allDetails?.pnl_report[indexDate].franchise_fee;

  let percentage =
    allDetails?.pnl_report[indexDate].commission_percentage +
    allDetails?.pnl_report[indexDate].shipping_percentage +
    allDetails?.pnl_report[indexDate].reverse_shipping_fee_percentage +
    allDetails?.pnl_report[indexDate].collection_percentage +
    allDetails?.pnl_report[indexDate].fixed_fee_percentage +
    allDetails?.pnl_report[indexDate].pick_and_pack_fee_percentage +
    allDetails?.pnl_report[indexDate].franchise_fee_percentage;

  return (
    <View style={ApplicationStyles.containerPadding}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header  */}
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.topTitle2}>
                {allDetails?.seller_name}
              </Text>
              <Text style={styles.descriptionHeader}>Profit & Loss Report</Text>
            </View>
            <View style={styles.dropdownView}>
              <Dropdown
                style={styles.tradetypeviewStyle}
                data={periodsList}
                selectedTextStyle={[styles.TitleTextStyle]}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={value}
                placeholder={""}
                onChange={(item) => {
                  setValue(item);
                  setIndexDate(item.value);
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
          {/* <View style={styles.datePickerMainView}>
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
          </View> */}
        </View>
        <View style={ApplicationStyles.chartCardWithourPadding}>
          <View style={styles.headingRow}>
            <Text style={styles.topTitle}>Income</Text>
          </View>
          <View style={styles.salesRow}>
            <Text style={styles.leftText}>Sales</Text>
            <Text style={styles.leftText}>
              ₹{" "}
              {numberWithCommas(
                allDetails?.pnl_report[indexDate]?.sales?.toFixed(1)
              )}
            </Text>
          </View>
          <View style={styles.salesRow}>
            <Text style={styles.leftText}>SPF Amount</Text>
            <Text style={styles.leftText}>
              ₹{" "}
              {numberWithCommas(
                allDetails?.pnl_report[indexDate]?.spf_amount?.toFixed(1)
              )}
            </Text>
          </View>
          <View style={styles.netIncomRow}>
            <Text style={styles.netIncomText}>Net Income</Text>
            <Text style={styles.netIncomText}>
              ₹{" "}
              {numberWithCommas(
                allDetails?.pnl_report[indexDate]?.net_income_amount?.toFixed(1)
              )}
            </Text>
          </View>
        </View>

        {allDetails?.pnl_report_shows_cogs && (
          <View style={ApplicationStyles.chartCardWithourPadding}>
            <View style={styles.headingRow}>
              <Text style={styles.topTitle}>Cost Of Goods Sold</Text>
            </View>
            <RenderRow
              title={"COGS"}
              rs={
                numberWithCommas(
                  allDetails?.pnl_report[indexDate].cogs?.toFixed(1)
                ) || ""
              }
              pr={allDetails?.pnl_report[indexDate].cogs_percentage?.toFixed(1)}
            />
          </View>
        )}

        <View style={ApplicationStyles.chartCardWithourPadding}>
          <View style={styles.headingRow}>
            <Text style={styles.topTitle}>Expenses</Text>
          </View>
          <RenderRow
            title={"Commission Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].commission_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[indexDate].commission_percentage?.toFixed(
                1
              )
            )}
          />
          <RenderRow
            title={"Shipping Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].shipping_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[indexDate].shipping_percentage?.toFixed(1)
            )}
          />
          <RenderRow
            title={"Reverse Shipping Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].reverse_shipping_fee?.toFixed(
                  1
                )
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[
                indexDate
              ].reverse_shipping_fee_percentage?.toFixed(1)
            )}
          />
          <RenderRow
            title={"Collection Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].collection_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[indexDate].collection_percentage?.toFixed(
                1
              )
            )}
          />
          <RenderRow
            title={"Fixed Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].fixed_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[indexDate].fixed_fee_percentage?.toFixed(1)
            )}
          />
          <RenderRow
            title={"Pick and Pack Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].pick_and_pack_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[
                indexDate
              ].pick_and_pack_fee_percentage?.toFixed(1)
            )}
          />
          <RenderRow
            title={"Franchise Fee"}
            rs={
              plusNumberWithCommas(
                allDetails?.pnl_report[indexDate].franchise_fee?.toFixed(1)
              ) || ""
            }
            pr={Math.abs(
              allDetails?.pnl_report[
                indexDate
              ].franchise_fee_percentage?.toFixed(1)
            )}
          />

          <View style={styles.netExpenseRow}>
            <Text numberOfLines={1} style={styles.leftTextExpense}>
              {"Net Expenses Fee"}
            </Text>

            <Text
              numberOfLines={1}
              style={{ ...styles.middleTextExpense, textAlign: "right" }}
            >
              {"₹ "}
              {plusNumberWithCommas(netExpenses?.toFixed(1))}
            </Text>

            <Text numberOfLines={1} style={styles.rightTextExpense}>
              {Math.abs(percentage.toFixed(1))}
              {"%"}
            </Text>
          </View>
        </View>
        <View style={styles.grossProfitView}>
          <View style={styles.grossRow}>
            <Text style={styles.profitText}>Gross Profit</Text>
            <Text style={styles.profitRsText}>
              {"₹ "}
              {numberWithCommas(
                allDetails?.pnl_report[indexDate].gross_profit_amount?.toFixed(
                  1
                )
              )}
            </Text>
          </View>
          <View style={[styles.grossRow, { paddingTop: hp(1.5) }]}>
            <Text style={styles.profitText}>Gross Profit %</Text>
            <Text style={styles.profitRsText}>
              {allDetails?.pnl_report[
                indexDate
              ].gross_profit_percentage?.toFixed(1)}
              %
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            let url =
              "whatsapp://send?text=" +
              "Hello" +
              "&phone=91" +
              allDetails?.sales_person_mobile_number;
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
        </TouchableOpacity> */}
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
  topTitle2: {
    ...commonFontStyle(600, 17, Colors.darkBlueFont),
  },
  descriptionHeader: {
    ...commonFontStyle(500, 15, Colors.blueOpacityFont),
  },
  tradetypeviewStyle: {
    backgroundColor: Colors.dropDownBgColor,
    borderRadius: 100,
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.2),
  },
  TitleTextStyle: {
    ...commonFontStyle(500, 12, Colors.blueOpacityFont),
  },
  heading: {
    width: "58%",
  },
  dropdownView: {
    width: "42%",
  },
  textItem: {
    ...commonFontStyle(500, 12, Colors.grayFont),
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
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
    width: "52%",
  },
  middleText: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    width: "30%",
  },
  rightText: {
    ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
    width: "18%",
    textAlign: "right",
  },
  leftTextExpense: {
    ...commonFontStyle(500, 13, Colors.red),
    width: "45%",
  },
  middleTextExpense: {
    ...commonFontStyle(500, 13, Colors.darkBlueFont),
    width: "37%",
    // backgroundColor: "red",
  },
  rightTextExpense: {
    ...commonFontStyle(500, 13, Colors.darkBlueFont),
    width: "18%",
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
