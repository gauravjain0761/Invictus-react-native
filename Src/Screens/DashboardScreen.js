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
import { getDetails, setPeriodsList } from "../Actions/authActions";
import Loader from "../Components/Loader";
import moment from "moment";
import { humanize } from "../Helper/global";

const data = [
  { label: "Last Week", value: "1" },
  { label: "Last Month", value: "2" },
  { label: "Last Year", value: "3" },
];
export default function DashboardScreen({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownData, setDropDownData] = useState([]);
  const [value, setValue] = useState({});
  const { allDetails, isLoginButtonPress } = useSelector(
    (state) => state.common
  );
  const [indexDate, setIndexDate] = useState(0);
  const [selectedButton, setSelectedButton] = useState("sales");
  const [currentDashBoardData, setCurrentDashBoardData] = useState({});
  const [graphData, setGraphData] = useState([]);

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
    if (isLoginButtonPress) {
      setCurrentDashBoardData(allDetails?.dashboard?.["sales"]?.[indexDate]);
      setGraphData(allDetails?.dashboard?.["sales"]?.[indexDate]?.graph);
      setIsLoading(false);
      setValue({
        label:
          allDetails?.periods?.[indexDate]?.[indexDate]?.start_date +
          "-" +
          allDetails?.periods?.[indexDate]?.[indexDate]?.end_date,
        value: 0,
      });
      let newData = [];
      allDetails?.periods?.map((i, index) => {
        let obj = {
          value: index,
          label:
            moment(i[index]["start_date"]).format("DD-MM-YYYY") +
            "-" +
            moment(i[index]["end_date"]).format("DD-MM-YYYY"),
        };
        newData.push(obj);
        dispatch(setPeriodsList(newData));
        setDropDownData(newData);
      });
    } else {
      setIsLoading(true);
      const request = {
        onSuccess: (res) => {
          setCurrentDashBoardData(res.dashboard["sales"][indexDate]);
          setGraphData(res.dashboard["sales"][indexDate].graph);
          setIsLoading(false);
          setValue({
            label:
              res.periods[indexDate][indexDate].start_date +
              "-" +
              res.periods[indexDate][indexDate].end_date,
            value: 0,
          });
          let newData = [];
          res.periods.map((i, index) => {
            let obj = {
              value: index,
              label:
                moment(i[index]["start_date"]).format("DD-MM-YYYY") +
                "-" +
                moment(i[index]["end_date"]).format("DD-MM-YYYY"),
            };
            newData.push(obj);
            dispatch(setPeriodsList(newData));
            setDropDownData(newData);
          });
        },
        onFail: () => setIsLoading(false),
      };
      dispatch(getDetails(request));
    }
  }, []);

  const onPressButtons = (type) => {
    setSelectedButton(type);
    setCurrentDashBoardData(allDetails?.dashboard?.[type][indexDate]);
    setGraphData(allDetails?.dashboard?.[type][indexDate].graph);
  };

  return (
    <View style={ApplicationStyles.containerPadding}>
      <Loader visible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.topTitle}>
                {allDetails?.seller_name}
              </Text>
              <Text style={styles.descriptionHeader}>Sales</Text>
            </View>
            <View style={styles.dropdownView}>
              <Dropdown
                style={styles.tradetypeviewStyle}
                data={dropdownData}
                selectedTextStyle={[styles.TitleTextStyle]}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={value}
                placeholder={""}
                onChange={(item) => {
                  setValue(item);
                  setIndexDate(item.value);
                  setCurrentDashBoardData(
                    allDetails.dashboard[selectedButton][item.value]
                  );
                  setGraphData(
                    allDetails.dashboard[selectedButton][item.value].graph
                  );
                }}
                renderItem={(item) => (
                  <View style={{}}>
                    <Text style={styles.textItem}>{item.label}</Text>
                  </View>
                )}
                iconColor={Colors.grayFont}
              />
            </View>
          </View>
          {/* <Chart /> */}
          <NewChart passData={graphData} />
        </View>
        <View style={styles.chartHeader}>
          <View style={styles.halfView}>
            <View style={ApplicationStyles.chartCard}>
              <View style={styles.rupeeIcon}>
                <RupeeIcon />
              </View>
              <View style={{ height: hp(6) }}>
                <Text numberOfLines={2} style={styles.cardDes}>
                  {humanize(Object.keys(currentDashBoardData)?.[0])}
                </Text>
              </View>
              <Text style={styles.rupees}>
                {Object.values(currentDashBoardData)?.[0]?.toFixed(1)}
              </Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <View style={ApplicationStyles.chartCard}>
              <View style={styles.unitIcon}>
                <UnitIcon />
              </View>
              <View style={{ height: hp(6) }}>
                <Text style={styles.cardDes}>
                  {humanize(Object.keys(currentDashBoardData)?.[1])}
                </Text>
              </View>
              <Text style={styles.rupees}>
                {Object.values(currentDashBoardData)?.[1]?.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chartHeader}>
          <TouchableOpacity
            onPress={() => onPressButtons("sales")}
            style={[
              styles.halfView,
              selectedButton === "sales"
                ? styles.buttonViewGross
                : styles.buttonViewReturn,
            ]}
          >
            <GrossProfitIcon />
            <Text
              style={{
                paddingLeft: 8,
                ...commonFontStyle(
                  500,
                  16,
                  selectedButton === "sales" ? Colors.white : Colors.blue
                ),
              }}
            >
              {"Sales"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressButtons("gross_profit")}
            style={[
              styles.halfView,
              selectedButton === "gross_profit"
                ? styles.buttonViewGross
                : styles.buttonViewReturn,
            ]}
          >
            <ReturnIcon />
            <Text
              style={{
                paddingLeft: 8,
                ...commonFontStyle(
                  500,
                  16,
                  selectedButton === "gross_profit" ? Colors.white : Colors.blue
                ),
              }}
            >
              {"Gross Profit"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onPressButtons("returns")}
          style={[
            styles.halfView,
            selectedButton === "returns"
              ? styles.buttonViewGross
              : styles.buttonViewReturn,
          ]}
        >
          <ReturnIcon />
          <Text
            style={{
              paddingLeft: 8,
              ...commonFontStyle(
                500,
                16,
                selectedButton === "returns" ? Colors.white : Colors.blue
              ),
            }}
          >
            Return %
          </Text>
        </TouchableOpacity>
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
