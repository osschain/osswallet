import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { UseNetworks } from "@/app/api/network";
import NetworkOptions from "@/components/network/NetworkOptions";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { defaultImage } from "@/util/DefaultImage";
import { pixelToNumber } from "@/util/pixelToNumber";

const details = [
  {
    title: "symbol",
    value: "TGR",
  },
  {
    title: "Name",
    value: "Tegro",
  },
  {
    title: "Decimals",
    value: "18",
  },
];

export default function AddCustomToken() {
  const { data: networks } = UseNetworks();
  const [adress, setAdress] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
  const snapPoints = useMemo(() => ["95%", "95%"], []);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const approveToken = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleApproveModalPress = () => {
    approveToken.current?.present();
  };

  const scannerHandler = async (data: string) => {
    bottomSheetRef.current?.close();
    setAdress(data);
  };

  return (
    <ScrollContainerUi>
      <ScannerModalUi ref={bottomSheetRef} onBarcodeScanner={scannerHandler} />
      <BottomSheetModal index={0} snapPoints={snapPoints} ref={approveToken}>
        <ScrollContainerUi>
          <BodyUi>
            <SpacerUi size="xl">
              <HeaderTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-first")}
              </HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-second")}
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-third")}
              </BodyTextUi>
            </SpacerUi>

            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-forth")}
              </BodyTextUi>
            </SpacerUi>
          </BodyUi>
          <FooterUi>
            <ButtonUi>{t("shared.import")}</ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi variant="secondary">{t("shared.cancel")}</ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ScrollContainerUi>
      </BottomSheetModal>
      <NetworkOptions networks={networks} onSelect={() => {}} required />
      <BodyUi>
        <SpacerUi size="2xl">
          <TextAreaInputUi
            placeholder="Enter Token Adress"
            value={adress}
            onChangeText={(text) => setAdress(text)}
            multiline
            numberOfLines={5}
            right={
              <IconUi
                library="Ionicons"
                name="scan"
                size="2xl"
                color="icon-second"
                onPress={handlePresentModalPress}
              />
            }
          />
        </SpacerUi>
        <SpacerUi size="3xl">
          <TokenDetails>
            <Row>
              <LeftContent>
                <BodyTextUi weight="medium">icon:</BodyTextUi>
              </LeftContent>
              <RightContent>
                <Image
                  source={{ uri: defaultImage }}
                  width={pixelToNumber(theme.sizes["xl"])}
                  height={pixelToNumber(theme.sizes["xl"])}
                />
              </RightContent>
            </Row>
            {details.map(({ title, value }) => (
              <SpacerUi size="xl" key={title}>
                <Row>
                  <LeftContent>
                    <BodyTextUi weight="medium">{title}:</BodyTextUi>
                  </LeftContent>
                  <RightContent>
                    <BodyTextUi weight="medium" color="text-second">
                      {value}
                    </BodyTextUi>
                  </RightContent>
                </Row>
              </SpacerUi>
            ))}
          </TokenDetails>
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <ButtonUi onPress={handleApproveModalPress}>
          {t("wallet.home.custom-token.add-custom-token.import-token-button")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const TokenDetails = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

const LeftContent = styled.View``;

const RightContent = styled.View``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
