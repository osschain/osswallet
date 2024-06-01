import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";

export default function SendChain() {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams();
  const { data: assets } = useAssets();
  const asset = assets?.find((asset) => asset.blockchain === slug);

  if (!assets || !asset) {
    return (
      <SpacerUi>
        <MessageUi> t("shared.asset-error")</MessageUi>
      </SpacerUi>
    );
  }

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `Send ${asset?.name}` }} />
      <BodyUi>
        <SpacerUi size="3xl">
          <MessageUi>{t("wallet.home.send.warning")}</MessageUi>
        </SpacerUi>

        <SpacerUi size="2xl">
          <HeaderTextUi>{t("wallet.home.send.for-whom")}</HeaderTextUi>
          <SpacerUi size="lg">
            <TextInputUi placeholder="Enter Adress" />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <AssetQuantityInputUi placeholder="Enter Adress " />
          </SpacerUi>
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <Button onPress={() => {}} variant="primary">
          {t("shared.send")}
        </Button>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const Button = styled(ButtonUi)``;
