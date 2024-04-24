import { Entypo, Feather } from "@expo/vector-icons";
import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { useTheme } from "styled-components/native";

import {
  Card,
  BackgroundGradient,
  Header,
  UserName,
  WalletAdressContainer,
  WalletAdress,
  CopyAddres,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  ButtonText,
  MoneyAmount,
  Options,
} from "./style";

import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";

type Props = {
  userName: string;
  walletAddres: string;
  moneyAmount: string;
  onRecieve: () => void;
  onSend: () => void;
  onOptions: () => void;
} & ComponentPropsWithoutRef<typeof View>;

export default function WalletCard({
  userName = "Ton Wallet",
  walletAddres = "EQDHirLoAYIhplO....",
  moneyAmount = "$ 1520,056",
  onRecieve = () => {},
  onSend = () => {},
  onOptions = () => {},
}: Props) {
  const theme = useTheme();
  return (
    <Card>
      <BackgroundGradient
        colors={["#1566DF", "#21C5DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Header>
        <UserName size="lg">{userName}</UserName>
        <SpacerUi size="lg">
          <WalletAdressContainer>
            <WalletAdress size="sm">{walletAddres}</WalletAdress>
            <CopyAddres>
              <Feather
                name="copy"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </CopyAddres>
          </WalletAdressContainer>
        </SpacerUi>
        <SpacerUi size="xl">
          <MoneyAmount size="2xl">{moneyAmount}</MoneyAmount>
        </SpacerUi>
      </Header>
      <SpacerUi size="4xl">
        <Buttons>
          <Button onPress={onRecieve}>
            <ButtonIcon>
              <Feather
                name="arrow-down-left"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonText>Receive</ButtonText>
            <ButtonBacground />
          </Button>
          <Button onPress={onSend}>
            <ButtonText>Send</ButtonText>
            <ButtonIcon>
              <Feather
                name="arrow-down-right"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
        </Buttons>
      </SpacerUi>
      <Options onPress={onOptions}>
        <Entypo
          name="dots-three-vertical"
          size={pixelToNumber(theme.sizes["xl"])}
          color={theme.colors["pure-white"]}
        />
      </Options>
    </Card>
  );
}