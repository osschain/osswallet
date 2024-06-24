import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { useStackOptions } from "@/hooks/useStackOptions";

export default function _layout() {
  const { t } = useTranslation();
  const stackOptions = useStackOptions({
    headerLeft: () => null,
  });
  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen
        name="index"
        options={{ title: t("shared.notification") }}
      />
    </Stack>
  );
}
