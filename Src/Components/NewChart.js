// import React from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
// import PureChart from "react-native-pure-chart";

// import moment from "moment";
// import Colors from "../Themes/Colors";
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     this.generateData();
//   }

//   generateData() {
//     var data = [];
//     var startDate = moment();
//     for (var i = 0; i < 10; i++) {
//       startDate.add(1, "days");
//       data.push({
//         x: startDate.format("YYYY-MM-DD"),
//         y: Math.round(Math.random() * 500),
//       });
//     }
//     this.setState({
//       data: [
//         {
//           data: data,
//           color: Colors.blue,
//         },
//       ],
//     });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <PureChart
//             type={"line"}
//             data={this.state.data}
//             width={"100%"}
//             height={100}
//             onPress={(a) => {
//               console.log("onPress", a);
//             }}
//             xAxisColor={"black"}
//             yAxisColor={"red"}
//             xAxisGridLineColor={"red"}
//             yAxisGridLineColor={"red"}
//             minValue={10}
//             labelColor={"red"}
//             showEvenNumberXaxisLabel={false}
//             customValueRenderer={(index, point) => {
//               if (index < 3) return null;
//               return <Text style={{ textAlign: "center" }}>{point.y}</Text>;
//             }}
//           /> */}
//         <View style={{ height: 20 }} />
//         <PureChart
//           type={"bar"}
//           data={this.state.data}
//           height={200}
//           //   xAxisColor={"red"}
//           //   yAxisColor={"red"}
//           //   xAxisGridLineColor={"red"}
//           //   yAxisGridLineColor={"red"}
//           //   labelColor={"red"}
//           //   numberOfYAxisGuideLine={10}
//         />
//         {/* <PureChart type={"bar"} data={this.state.data} /> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import PureChart from "react-native-pure-chart";
import Colors from "../Themes/Colors";

const NewChart = ({ passData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    generateData();
  }, [passData]);

  const generateData = () => {
    var data = [];
    passData.map((i) => {
      data.push({
        x: moment(i.label).format("DD MMM"),
        y: i.value,
      });
    });
    setData([
      {
        data: data,
        color: Colors.blue,
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20 }} />
      <PureChart
        type={"bar"}
        data={data}
        height={210}
        labelColor={Colors.black}
        //   xAxisColor={"red"}
        //   yAxisColor={"red"}
        //   xAxisGridLineColor={"red"}
        //   yAxisGridLineColor={"red"}
        // numberOfYAxisGuideLine={10}
      />
    </View>
  );
};

export default NewChart;
