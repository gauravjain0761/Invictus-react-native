// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { SCREEN_WIDTH } from "../Themes/Fonts";
// import Colors from "../Themes/Colors";
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryLabel,
//   VictoryTheme,
// } from "victory-native";
// import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { LineChart } from "react-native-charts-wrapper";
// export default function Chart() {
//   const data = [
//     { quarter: "Sun", earnings: 80 },
//     { quarter: "Mon", earnings: 75 },
//     { quarter: "Tue", earnings: 50 },
//     { quarter: "Wed", earnings: 90 },
//     { quarter: "Thu", earnings: 70 },
//     { quarter: "Fri", earnings: 60 },
//     { quarter: "Sat", earnings: 50 },
//   ];

//   return (
//     <View style={styles.container}>
//       <VictoryChart
//         width={SCREEN_WIDTH - hp(2)}
//         height={280}
//         theme={VictoryTheme.material}
//       >
//         <VictoryBar
//           style={{
//             data: { fill: Colors.blue },
//           }}
//           cornerRadius={{ top: 5 }}
//           data={data}
//           // alignment={"start"}
//           x="quarter"
//           y="earnings"
//           labels={({ datum }) => `${datum.earnings}`}
//         />
//       </VictoryChart>
//       <LineChart
//         style={{ height: 500, flex: 1 }}
//         data={{
//           dataSets: [{ label: "demo", values: [{ y: 1 }, { y: 2 }, { y: 1 }] }],
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "#f5fcff",
//   },
// });

import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from "react-native";

import { BarChart } from "react-native-charts-wrapper";
import Colors from "../Themes/Colors";

class Chart extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
      },
      data: {
        dataSets: [
          {
            values: [
              { y: 60 },
              { y: 50 },
              { y: 70 },
              { y: 90 },
              { y: 85 },
              { y: 60 },
              { y: 50 },
              { y: 70 },
              { y: 80 },
              { y: 10 },
              { y: 30 },
              { y: 20 },
            ],
            label: "Bar dataSet",
            config: {
              color: processColor(Colors.blue),
              borderRadius: 10,
              valueTextSize: 12,
              valueTextColor: processColor(Colors.blueOpacityFont),
            },
          },
        ],

        config: {
          barWidth: 0.6,
        },
      },
      xAxis: {
        drawGridLines: false,
        position: "BOTTOM",
        valueFormatter: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        granularityEnabled: true,
        granularity: 1,
        textSize: 12,
        textColor: processColor(Colors.blueOpacityFont),
      },
      yAxis: {
        left: {
          // drawGridLines: false,
          gridColor: processColor(Colors.graphGridLine),
          valueFormatter: "#K",
          textSize: 12,
          textColor: processColor(Colors.blueOpacityFont),
        },
        right: { drawGridLines: false, enabled: false },
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{ durationX: 1000 }}
            legend={this.state.legend}
            gridBackgroundColor={processColor("#ffffff")}
            visibleRange={{ x: { min: 6, max: 6 } }}
            yAxis={this.state.yAxis}
            chartDescription={{ text: "" }}
            // drawBarShadow={false}
            // drawValueAboveBar={true}
            // drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            // highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
            pinchZoom={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5FCFF",
  },
  chart: {
    flex: 1,
    height: 300,
  },
});

export default Chart;
