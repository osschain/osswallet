import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { AssetType, useAsset } from "@/providers/AssetProvider";
import { networks } from "@/util/mock";

export default function Send() {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { assets } = useAsset();
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets;
    }
    return assets?.filter((asset) =>
      asset.blockchain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [assets, searchQuery]);

  if (!assets) {
    return <AlertWithImageUI title={t("shared.asset-error")} />;
  }

  return (
    <ContainerUi>
      <TextInputUi
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("shared.search")}
        left={
          <IconUi
            library="AntDesign"
            name="search1"
            size="xl"
            color="icon-second"
          />
        }
      />
      <NetworkOptions
        ref={bottomSheetRef}
        networks={networks}
        onSelect={() => {}}
      />

      <SpacerUi size="xl">
        <NetworkButton onPress={handlePresentModalPress}>
          {t("shared.all")} {t("shared.network")}
        </NetworkButton>
      </SpacerUi>
      <SpacerUi size="xl">
        <ChainList>
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <AssetItem key={item.name} asset={item} />
            )}
          />
        </ChainList>
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({ asset }: { asset: AssetType }) => (
  <SpacerUi size="3xl">
    <Link href={`/(wallet)/home/send/${asset.blockchain}`} asChild>
      <TouchableOpacity>
        <ItemUi
          title={asset.symbol}
          uri={asset.icon}
          description={asset.blockchain}
          right={<BodyTextUi weight="bold">15</BodyTextUi>}
        />
      </TouchableOpacity>
    </Link>
  </SpacerUi>
);

const ChainList = styled.View``;
