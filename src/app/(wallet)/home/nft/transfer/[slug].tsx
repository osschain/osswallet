import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { AddresTypes } from "@/@types/balances";
import { useAssets } from "@/app/api/assets";
import NftDetails from "@/components/nft/NftDetails";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { OSSblockchain } from "@/services/history.service";
import { fetchGasFee } from "@/services/send.service";

export default function TransferNft() {
  const { t } = useTranslation();
  const [details, setDetails] = useState<object | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const [address, setAddress] = useState("");
  const { slug: contractAddress, blockchain, tokenId } = useLocalSearchParams();

  const { data: assetManager } = useAssets();

  const adresses = assetManager?.addresses;
  const fromAddress = useMemo(() => {
    return adresses?.find((adress) => adress.type === AddresTypes.evm)?.address;
  }, [adresses]);

  const scanAddress = useRef<BottomSheetModal>(null);
  const isCorrectAddress = isAddress(address);

  const setupDetails = useCallback(async () => {
    if (!contractAddress || !blockchain) {
      return;
    }

    setIsDetailsLoading(true);
    try {
      const gasFee = await fetchGasFee({
        contractAddress: contractAddress as string,
        toAddress: address,
        fromAddress: fromAddress as string,
        blockchain: blockchain as OSSblockchain,
        amount: 1,
      });
    } catch (error) {
      console.log(error.code);
    } finally {
      setIsDetailsLoading(false);
    }
  }, [address, blockchain, contractAddress, fromAddress]);

  useEffect(() => {
    if (isAddress(address)) {
      setupDetails();
    }
  }, [address, setupDetails]);

  //   if (isError) {
  //     return <AlertWithImageUI title={t("wallet.home.nft.slug.alert-error")} />;
  //   }

  return (
    <ScrollContainerUi>
      <BodyUi>
        <SpacerUi size="3xl">
          <BodyTextUi weight="semi" color="text-second">
            {t("wallet.home.nft.transfer.alert-text")}
          </BodyTextUi>
        </SpacerUi>
        <SpacerUi>
          <ScannerModalUi
            ref={scanAddress}
            onBarcodeScanner={(address) => {
              setAddress(address);
              scanAddress.current?.close();
            }}
          />
        </SpacerUi>
        <SpacerUi size="3xl">
          <HeaderTextUi>{t("shared.for-whom")}</HeaderTextUi>
          <SpacerUi size="lg">
            <TextInputUi
              onChangeText={(text) => setAddress(text)}
              value={address}
              right={
                <IconUi
                  library="Ionicons"
                  name="scan"
                  size="xl"
                  color="icon-second"
                  onPress={() => scanAddress.current?.present()}
                />
              }
              placeholder={t(
                "wallet.home.nft.transfer.address-input-placeholder"
              )}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="xl" fullHeight>
          {isCorrectAddress && (
            <NftDetails details={details} loading={isDetailsLoading} />
          )}
        </SpacerUi>
      </BodyUi>
      <FooterUi>
        <ButtonUi
          disabled={!isCorrectAddress || !details}
          variant={isCorrectAddress && details ? "primary" : "secondary"}
        >
          {t("shared.confirm")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}
