import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import SpacerUi from "../ui/SpacerUi";

import { DetailsType } from "@/app/(wallet)/home/send/[slug]";

const SendDetails = ({
  details,
  loading,
}: {
  details: DetailsType | null;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      loading && (
        <SpacerUi size="4xl">
          <ActivityIndicator />
        </SpacerUi>
      )
    );
  }

  return (
    <>
      <HeaderTextUi style={{ textAlign: "center" }}>
        {t("wallet.home.send.send-details.title")}
      </HeaderTextUi>
      <SpacerUi size="4xl">
        <HeaderTextUi size="xl" style={{ textAlign: "center" }}>
          -{details?.amount} {details?.symbol}
        </HeaderTextUi>
      </SpacerUi>
      <SpacerUi size="4xl">
        <Details>
          <Detail
            label={`${t("wallet.home.send.send-details.asset")}:`}
            value={details?.name}
          />
          <SpacerUi size="xl">
            <Detail
              label={`${t("wallet.home.send.send-details.from")}:`}
              textStyle={{ width: "90%" }}
              numberOfLines={1}
              value={details?.from}
            />
          </SpacerUi>

          <SpacerUi size="xl">
            <Detail
              label={`${t("wallet.home.send.send-details.to")}:`}
              value={details?.to}
              textStyle={{ width: "90%" }}
              numberOfLines={1}
            />
          </SpacerUi>
        </Details>
      </SpacerUi>

      <SpacerUi size="xl">
        <Details>
          <Detail
            label={`${t("wallet.home.send.send-details.fee")}:`}
            value={details?.fee + " " + details?.symbol}
          />
          <SpacerUi size="xl">
            <Detail
              label={`${t("wallet.home.send.send-details.max-total")}:`}
              value={details?.maxTotal + " $"}
            />
          </SpacerUi>
        </Details>
      </SpacerUi>
    </>
  );
};

const Detail = ({
  label,
  value,
  textStyle,
  numberOfLines,
}: {
  label: string;
  value: string | number | undefined | null;
  textStyle?: any;
  numberOfLines?: number;
}) => (
  <Row>
    <LeftContent>
      <BodyTextUi weight="medium">{label}</BodyTextUi>
    </LeftContent>
    <RightContent>
      <BodyTextUi
        style={{ ...textStyle }}
        numberOfLines={numberOfLines}
        weight="medium"
        color="text-second"
      >
        {value}
      </BodyTextUi>
    </RightContent>
  </Row>
);

const Details = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

const LeftContent = styled.View`
  width: 40%;
`;

const RightContent = styled.View`
  width: 60%;
  align-items: flex-end;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default SendDetails;
