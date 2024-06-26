import { Stack } from "expo-router";

import { useStackOptions } from "@/hooks/useStackOptions";

export default function _layout() {
  const stackOptions = useStackOptions();
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="[slug]" options={{ title: "Transfer" }} />
    </Stack>
  );
}
