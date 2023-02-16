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
import { humanize } from "../Helper/global";

export default function LossesScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { allDetails } = useSelector((state) => state.common);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const entries = Object.entries(allDetails?.losses);
    setTableData(entries);
  }, []);

  const onCall = () => {
    let phoneNumber = allDetails?.sales_person_mobile_number;
    Linking.openURL("tel:" + phoneNumber);
  };

  return (
    <View style={ApplicationStyles.containerPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.chartCard}>
          <Text numberOfLines={1} style={styles.topTitle}>
            {allDetails?.seller_name}
          </Text>
          <Text style={styles.descriptionHeader}>Losses</Text>
        </View>
        {allDetails?.show_losses_table ? (
          <View style={{ ...ApplicationStyles.chartCard, marginBottom: hp(2) }}>
            <FlatList
              data={tableData}
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
                      {item?.[1]}
                    </Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorStyle} />
              )}
            />
          </View>
        ) : null}

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
            <TouchableOpacity
              onPress={() => onCall()}
              style={styles.blueButton}
            >
              <CallIcon />
              <Text style={styles.btnText}>Talk to Somebody Now</Text>
            </TouchableOpacity>
          </View>
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
