import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import RootContainer from "./Src/Navigation/RootContainer";
import { Provider } from "react-redux";
import store from "./Src/Redux/index";
import MainRoot from "./Src/MainRoot";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
          "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <MainRoot />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
