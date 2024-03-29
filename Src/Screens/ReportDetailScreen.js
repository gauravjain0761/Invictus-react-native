import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import {
  CalenderIcon,
  DownloadIcon,
  InfoIcon,
  ReportDownloadIcon,
} from "../SvgIcons/IconSvg";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { Dropdown } from "react-native-element-dropdown";
import Chart from "../Components/Chart";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { styles } from "./PLScreen";
import { numberWithCommas } from "../Helper/global";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];

export default function ReportDetailScreen() {
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

  const RenderRow = ({ title, rs, per }) => {
    return (
      <View style={styles.salesRow}>
        <View style={screenStyles.leftView}>
          <Text style={screenStyles.categoryText}>{title}</Text>
        </View>
        <View style={screenStyles.middleView}>
          <Text style={screenStyles.categoryText}>
            {"₹ "}
            {rs}
          </Text>
        </View>
        <View style={screenStyles.rightView}>
          <Text style={screenStyles.categoryText}>{per}</Text>
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
              <Text style={styles.descriptionHeader}>Sales by Category</Text>
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
        {allDetails?.top_selling_skus[indexDate].length ? (
          <View style={ApplicationStyles.chartCardWithourPadding}>
            <View style={styles.headingRow}>
              <View style={styles.chartHeader}>
                <View style={screenStyles.leftView}>
                  <Text style={screenStyles.title}>{"SKU"}</Text>
                </View>
                <View style={screenStyles.middleView}>
                  <Text style={screenStyles.title}>{"Gross Sale"}</Text>
                </View>
                <View style={screenStyles.rightView}>
                  <Text style={screenStyles.title}>{"Gross Sale Count"}</Text>
                </View>
              </View>
            </View>
            <FlatList
              data={allDetails?.top_selling_skus[indexDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <RenderRow
                    title={item?.sku}
                    rs={numberWithCommas(item?.gross_sale)}
                    per={item?.gross_sale_count}
                  />
                );
              }}
            />
            <View style={styles.netExpenseRow}>
              <Text style={screenStyles.leftTextExpense}>{"Total"}</Text>
              <Text style={screenStyles.middleTextExpense}>
                {"₹ 45,00,000"}
              </Text>
              <Text style={screenStyles.rightTextExpense}>{"100%"}</Text>
            </View>
          </View>
        ) : (
          <Text style={screenStyles.noTextStyle}>{"No Data Found"}</Text>
        )}

        <View style={ApplicationStyles.chartCard}>
          <View style={screenStyles.infoView}>
            <InfoIcon />
            <Text style={screenStyles.infoText}>
              A report of how your business is split up within the different
              categories and the revenue numbers of each.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.reportBtn}>
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

const screenStyles = StyleSheet.create({
  leftView: { width: "35%" },
  middleView: { width: "35%" },
  rightView: { width: "25%" },
  title: { ...commonFontStyle(500, 13, Colors.darkBlueFont) },
  categoryText: { ...commonFontStyle(400, 14, Colors.blueOpacity_8Font) },
  leftTextExpense: { width: "35%", ...commonFontStyle(500, 16, Colors.red) },
  middleTextExpense: {
    width: "35%",
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
  },
  rightTextExpense: {
    width: "25%",
    ...commonFontStyle(500, 16, Colors.darkBlueFont),
  },
  infoView: {
    flexDirection: "row",
  },
  infoText: {
    ...commonFontStyle(400, 12, Colors.darkBlueFont),
    paddingLeft: hp(1),
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
  },
});
