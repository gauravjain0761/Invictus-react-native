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
import { humanize } from "../Helper/global";
import Header from "../Components/Header";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];

export default function CategoryWiseReturn() {
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

  const totalSalesCount = allDetails?.category_wise_return_percentage[
    indexDate
  ].reduce(
    (previousScore, currentScore, index) =>
      previousScore + currentScore.total_sales,
    0
  );

  const totalReturnCount = allDetails?.category_wise_return_percentage[
    indexDate
  ].reduce(
    (previousScore, currentScore, index) =>
      previousScore + currentScore.return_count,
    0
  );

  const totalCustomerReturnCount = allDetails?.category_wise_return_percentage[
    indexDate
  ].reduce(
    (previousScore, currentScore, index) =>
      previousScore + currentScore.customer_return_percentage,
    0
  );

  const TableHeaderRow = ({
    sku,
    total_sales,
    return_count,
    percentage,
    newStyle,
  }) => {
    return (
      <View style={styles.salesRow}>
        <View style={screenStyles.leftView}>
          <Text numberOfLines={1} style={screenStyles.HeaderText}>
            {sku}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.middleView1}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.HeaderText, ...newStyle }}
          >
            {total_sales}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.middleView2}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.HeaderText, ...newStyle }}
          >
            {return_count}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.rightView}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.HeaderText, ...newStyle }}
          >
            {percentage}
          </Text>
        </View>
      </View>
    );
  };

  const RenderRow = ({
    sku,
    total_sales,
    return_count,
    percentage,
    newStyle,
  }) => {
    return (
      <View style={styles.salesRow}>
        <View style={screenStyles.leftView}>
          <Text numberOfLines={1} style={screenStyles.categoryText}>
            {sku}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.middleView1}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.categoryText, ...newStyle }}
          >
            {total_sales}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.middleView2}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.categoryText, ...newStyle }}
          >
            {return_count}
          </Text>
        </View>
        <View style={screenStyles.marginStyle} />
        <View style={screenStyles.rightView}>
          <Text
            numberOfLines={1}
            style={{ ...screenStyles.categoryText, ...newStyle }}
          >
            {percentage}
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

  const TotalRedContainer = ({
    total_sales,
    return_count,
    customer_return_percentage,
  }) => {
    return (
      <View style={screenStyles.redContainer}>
        <Text
          style={{
            ...screenStyles.leftTextExpense,
            ...screenStyles.leftView,
          }}
        >
          {"Total"}
        </Text>
        <View style={screenStyles.marginStyle} />
        <Text
          style={{
            ...screenStyles.middleView1,
            textAlign: "right",
            ...commonFontStyle(500, 16, Colors.darkBlueFont),
          }}
        >
          {total_sales}
        </Text>
        <View style={screenStyles.marginStyle} />
        <Text
          style={{
            ...screenStyles.middleView2,
            textAlign: "right",
            ...commonFontStyle(500, 16, Colors.darkBlueFont),
          }}
        >
          {return_count}
        </Text>
        <View style={screenStyles.marginStyle} />
        <Text
          style={{
            ...screenStyles.rightView,
            textAlign: "right",
            ...commonFontStyle(500, 16, Colors.darkBlueFont),
          }}
        >
          {customer_return_percentage}
        </Text>
      </View>
    );
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
              <Text numberOfLines={1} style={styles.descriptionHeader}>
                Category wise return %
              </Text>
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
            <TableHeaderRow
              sku={"SKU"}
              total_sales={"Total Sales"}
              return_count={"Return Count"}
              percentage={"Customer Return%"}
              newStyle={{ textAlign: "right" }}
            />

            <FlatList
              bounces={false}
              data={allDetails?.category_wise_return_percentage[indexDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <RenderRow
                    sku={humanize(item?.category)}
                    total_sales={item?.total_sales}
                    return_count={item?.return_count}
                    percentage={item?.customer_return_percentage}
                    newStyle={{ textAlign: "right" }}
                  />
                );
              }}
              ListFooterComponent={() => {
                if (
                  allDetails?.category_wise_return_percentage[indexDate]
                    .length === 0
                ) {
                  return (
                    <Text style={screenStyles.noTextStyle}>
                      {"No Data Found"}
                    </Text>
                  );
                }
              }}
            />
            {/* <TotalRedContainer
              total_sales={totalSalesCount}
              return_count={totalReturnCount}
              customer_return_percentage={totalCustomerReturnCount.toFixed(1)}
            /> */}
          </View>
        </ScrollView>

        <View style={ApplicationStyles.reportContainer}>
          <InfoIcon />
          <Text style={screenStyles.infoText}>
            {
              "A report of your categories in order of the highest to lowest customer return percentage."
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
  leftView: { width: wp(35) },
  middleView1: { width: wp(22) },
  middleView2: { width: wp(26) },
  rightView: { width: wp(37) },
  marginStyle: { width: wp(5) },
  title: { ...commonFontStyle(500, 13, Colors.darkBlueFont) },
  categoryText: { ...commonFontStyle(400, 14, Colors.blueOpacity_8Font) },
  HeaderText: {
    ...commonFontStyle(500, 13, Colors.darkBlueFont),
    marginTop: hp(2),
  },
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
  redContainer: {
    backgroundColor: Colors.lightRedBgColor,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(2) - 5,
    paddingVertical: hp(1.5),
  },
});
