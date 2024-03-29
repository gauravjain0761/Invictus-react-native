import {
  FlatList,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { CallIcon } from "../SvgIcons/IconSvg";
import { useEffect } from "react";
import { humanize, numberWithCommas } from "../Helper/global";
import Header from "../Components/Header";

export default function LossesScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { allDetails } = useSelector((state) => state.common);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const entries = Object.entries(allDetails?.losses);
    setTableData(entries);
  }, []);
  console.log("tableData--", tableData);
  const onCall = () => {
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
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.chartCard}>
          <Text numberOfLines={1} style={styles.topTitle}>
            {allDetails?.seller_name}
          </Text>
          <Text style={styles.descriptionHeader}>Losses</Text>
        </View>
        {allDetails?.show_losses_table ? (
          <View>
            <View
              style={{ ...ApplicationStyles.chartCard, marginVertical: hp(2) }}
            >
              <FlatList
                data={tableData.slice(0, 2)}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.rowStyle}>
                      <Text
                        style={{
                          ...commonFontStyle(500, 14, Colors.darkBlueFont),
                          flex: 1,
                        }}
                      >
                        {humanize(item?.[0])}
                      </Text>
                      <View style={{ width: wp(5) }} />
                      <Text
                        style={{
                          ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
                          flex: 0.7,
                          textAlign: "right",
                        }}
                      >
                        {index === 10 ? parseInt(item?.[1]) : item?.[1]}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparatorStyle} />
                )}
              />
            </View>
            <View
              style={{ ...ApplicationStyles.chartCard, marginBottom: hp(2) }}
            >
              <FlatList
                data={tableData.splice(
                  tableData.length - (tableData.length - 2)
                )}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.rowStyle}>
                      <Text
                        style={{
                          ...commonFontStyle(500, 14, Colors.darkBlueFont),
                          flex: 1,
                        }}
                      >
                        {humanize(item?.[0])}
                      </Text>
                      <View style={{ width: wp(5) }} />
                      <Text
                        style={{
                          ...commonFontStyle(400, 14, Colors.blueOpacity_8Font),
                          flex: 0.7,
                          textAlign: "right",
                        }}
                      >
                        {index === 10
                          ? numberWithCommas(parseInt(item?.[1]).toFixed(1))
                          : numberWithCommas(item?.[1].toFixed(1))}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparatorStyle} />
                )}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.rupeeView}>
              <Text style={styles.textRupee}>₹</Text>
            </View>
            <View style={styles.redView}>
              <Text style={styles.titleRedView}>
                Your estimated monthly looses are
              </Text>
              <Text style={styles.rsText}>
                ₹ {allDetails?.losses?.["Total Losses"]}/-
              </Text>
              <TouchableOpacity onPress={onCall} style={styles.blueButton}>
                <CallIcon />
                <Text style={styles.btnText}>Talk to Somebody Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topTitle: {
    ...commonFontStyle(600, 17, Colors.darkBlueFont),
    marginRight: 5,
  },
  descriptionHeader: {
    ...commonFontStyle(500, 15, Colors.blueOpacityFont),
  },
  rupeeView: {
    backgroundColor: Colors.red,
    height: hp(7),
    width: hp(7),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginTop: hp(2),
    alignSelf: "center",
  },
  textRupee: { ...commonFontStyle(400, 28, Colors.white) },
  redView: {
    marginTop: hp(5.5),
    backgroundColor: Colors.lightRedBgColor,
    paddingHorizontal: hp(2),
    paddingBottom: hp(4),
    paddingTop: hp(6.5),
    borderRadius: 10,
  },
  titleRedView: {
    ...commonFontStyle(500, 14, Colors.blueOpacity_8Font),
    textAlign: "center",
  },
  rsText: {
    ...commonFontStyle(700, 31, Colors.darkBlueFont),
    textAlign: "center",
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  blueButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1.5),
  },
  btnText: { ...commonFontStyle(500, 12, Colors.white), paddingLeft: hp(1) },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemSeparatorStyle: {
    height: 1,
    marginVertical: hp(1),
    backgroundColor: Colors.deviderLine,
  },
});
