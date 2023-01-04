import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SCREEN_WIDTH } from "../Themes/Fonts";
import Colors from "../Themes/Colors";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Chart() {
  const data = [
    { quarter: "Sun", earnings: 80 },
    { quarter: "Mon", earnings: 75 },
    { quarter: "Tue", earnings: 50 },
    { quarter: "Wed", earnings: 90 },
    { quarter: "Thu", earnings: 70 },
    { quarter: "Fri", earnings: 60 },
    { quarter: "Sat", earnings: 50 },
  ];

  return (
    <View style={styles.container}>
      <VictoryChart
        width={SCREEN_WIDTH - hp(2)}
        height={280}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          style={{
            data: { fill: Colors.blue },
          }}
          cornerRadius={{ top: 5 }}
          data={data}
          alignment={"start"}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
