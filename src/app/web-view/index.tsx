import Constants from "expo-constants";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const { link } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: link }} />
      <WebView style={styles.container} source={{ uri: link }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});