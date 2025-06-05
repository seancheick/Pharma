import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, theme } from "@gluestack-ui/themed-native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabNavigator } from "./src/navigation/TabNavigator";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
