import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function MnemonicBackUping() {
  const [words, setWords] = useState<string[]>([]);
  const { mnemonic } = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    if (mnemonic) {
      setWords(mnemonic.trim().split(/\s+/));
    }
  }, [mnemonic]);

  return (
    <ScrollContainerUi>
      <SpacerUi size="xl" />
      <BodyUi>
        <BannerImage
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText adjustsFontSizeToFit size="2xl" weight="bold">
            {t("auth.mnemonic-back-uping.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("auth.mnemonic-back-uping.description")}
          </DescriptionText>
        </SpacerUi>
        <SpacerUi size="2xl" />

        <MnemonicWrapper>
          {words.map((word, index) => {
            return (
              <Phrase size="lg" weight="medium" key={index}>
                <BodyTextUi color="text-second" size="lg" weight="medium">
                  {index + 1}.
                </BodyTextUi>
                {` ${word}`}
              </Phrase>
            );
          })}
        </MnemonicWrapper>
      </BodyUi>

      <FooterUi>
        <ButtonUi
          onPress={() => {
            router.push("/auth/mnemonic-checking");
          }}
        >
          {t("shared.continue")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const windowWidth = Dimensions.get("window").width;

const MnemonicWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["2xl"]};
  flex-wrap: wrap;
`;

const BannerImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const HeaderText = styled(HeaderTextUi)`
  text-align: center;
`;

const Phrase = styled(BodyTextUi)`
  flex-basis: ${({ theme }) =>
    windowWidth / 2 - pixelToNumber(theme.spaces["xl"]) * 2 - 12}px;
  padding: 2px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  border-width: 1px;
  text-align: center;
  border-radius: ${({ theme }) => theme.spaces["lg"]};
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;
