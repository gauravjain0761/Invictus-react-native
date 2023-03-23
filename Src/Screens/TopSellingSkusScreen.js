import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { InfoIcon, ReportDownloadIcon } from "../SvgIcons/IconSvg";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./PLScreen";
import Header from "../Components/Header";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];

export default function TopSellingSkusScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateTyppe, setDateTyppe] = useState("start");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [indexDate, setIndexDate] = useState(0);
  const { allDetails, periodsList } = useSelector((state) => state.common);

  useEffect(() => {
    setValue(periodsList[indexDate]);
  }, []);

  // let newData = [
  //   {
  //     sku: "FO_TG_MOTO G60_11D_1PK",
  //     gross_sale: 34317.18,
  //     gross_sale_count: 234,
  //   },
  //   {
  //     sku: "GF_TG-6-MOTO G60/G40-21D-1PK",
  //     gross_sale: 32517.3,
  //     gross_sale_count: 252,
  //   },
  //   {
  //     sku: "FO-TG_1 Sam SS22 Ultra 5G-UV_1PK.",
  //     gross_sale: 28112.92,
  //     gross_sale_count: 88,
  //   },
  // ];

  // const totalGross = allDetails?.top_selling_skus[indexDate].reduce(
  const totalGross = allDetails?.top_selling_skus[indexDate].reduce(
    (previousScore, currentScore, index) =>
      previousScore + currentScore.gross_sale,
    0
  );

  const totalGrossCount = allDetails?.top_selling_skus[indexDate].reduce(
    (previousScore, currentScore, index) =>
      previousScore + currentScore.gross_sale_count,
    0
  );

  const RenderRow = ({ title, rs, per }) => {
    return (
      <View style={styles.salesRow}>
        <View style={screenStyles.leftView}>
          <Text numberOfLines={1} style={screenStyles.categoryText}>
            {title}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.middleView}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.categoryText, textAlign: "right" }}
          >
            {/* {"₹ "} */}
            {rs}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.rightView}>
          <Text style={{ ...screenStyles.categoryText, textAlign: "right" }}>
            {per}
          </Text>
        </View>
      </View>
    );
  };

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

  const onPressReport = () => {
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
  };

  return (
    <View style={ApplicationStyles.containerPadding}>
      <Header isBackShow={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header  */}
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.topTitle}>
                {allDetails?.seller_name}
              </Text>
              <Text style={styles.descriptionHeader}>Top Selling SKUs</Text>
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
        <ScrollView horizontal>
          <View style={ApplicationStyles.chartCardWithourPadding}>
            <View style={styles.headingRow}>
              <View style={styles.chartHeader}>
                <View style={screenStyles.leftView}>
                  <Text style={screenStyles.title}>{"SKU"}</Text>
                </View>
                <View style={screenStyles.marginStyle} />
                <View
                  style={{
                    ...screenStyles.middleView,
                  }}
                >
                  <Text style={{ ...screenStyles.title, textAlign: "right" }}>
                    {"Gross Sale"}
                  </Text>
                </View>
                <View style={screenStyles.marginStyle} />
                <View style={screenStyles.rightView}>
                  <Text style={{ ...screenStyles.title, textAlign: "right" }}>
                    {"Gross Sale\nCount"}
                  </Text>
                </View>
              </View>
            </View>
            <FlatList
              bounces={false}
              data={allDetails?.top_selling_skus[indexDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <RenderRow
                    title={item?.sku}
                    rs={Number(item?.gross_sale).toFixed(1)}
                    per={item?.gross_sale_count}
                  />
                );
              }}
              ListFooterComponent={() => {
                if (allDetails?.top_selling_skus[indexDate].length === 0) {
                  return (
                    <Text style={screenStyles.noTextStyle}>
                      {"No Data Found"}
                    </Text>
                  );
                }
              }}
            />
            {/* <View style={styles.netExpenseRow}>
              <Text style={screenStyles.leftTextExpense}>{"Total"}</Text>
              <View style={screenStyles.marginStyle} />
              <Text
                style={{
                  ...screenStyles.middleTextExpense,
                  textAlign: "right",
                }}
              >
                {Number(totalGross).toFixed(1)}
              </Text>
              <View style={screenStyles.marginStyle} />
              <Text
                style={{ ...screenStyles.rightTextExpense, textAlign: "right" }}
              >
                {totalGrossCount}
              </Text>
            </View> */}
          </View>
        </ScrollView>

        <View style={ApplicationStyles.reportContainer}>
          <InfoIcon />
          <Text style={screenStyles.infoText}>
            {
              "A report of your top selling SKUs alongside the corresponding revenue & sale count."
            }
          </Text>
        </View>
        {/* <TouchableOpacity onPress={onPressReport} style={styles.reportBtn}>
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

const screenStyles = StyleSheet.create({
  leftView: { width: wp(45) },
  middleView: { width: wp(22) },
  rightView: { width: wp(30) },
  marginStyle: { width: wp(4) },
  title: { ...commonFontStyle(500, 13, Colors.darkBlueFont) },
  categoryText: { ...commonFontStyle(400, 14, Colors.blueOpacity_8Font) },
  leftTextExpense: { width: wp(40), ...commonFontStyle(500, 16, Colors.red) },
  middleTextExpense: {
    width: wp(22),
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
  },
  rightTextExpense: {
    width: wp(30),
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
  },
  infoView: {
    flexDirection: "row",
  },
  infoText: {
    ...commonFontStyle(400, 12, Colors.darkBlueFont),
    paddingLeft: hp(1),
    flex: 1,
  },
  textItem: {
    ...commonFontStyle(500, 14, Colors.grayFont),
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
  },
  noTextStyle: {
    ...commonFontStyle(500, 14, Colors.grayFont),
    padding: hp(2),
    textAlign: "center",
    marginBottom: hp(2),
  },
});
