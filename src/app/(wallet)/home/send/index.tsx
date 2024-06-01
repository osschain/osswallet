import { Blockchain } from "@ankr.com/ankr.js";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import { Usebalances } from "@/app/api/balances";
import { useNetworks } from "@/app/api/network";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import useFilteredAssets from "@/hooks/useFilteredAssets";

export default function Send() {
  const [network, setNetwork] = useState<Blockchain | null>(null);

  const { data: networks } = useNetworks();
  const { data: assets } = useAssets();

  const { data: balances } = Usebalances();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useFilteredAssets(assets, searchQuery, network);

  const calculateBalance = (blockchain: string) => {
    const balance = Number(
      balances?.find((balance) => blockchain === balance.blockchain)?.balance ||
        0
    );
    return Number(balance.toFixed(3));
  };

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

      <SpacerUi size="xl">
        <NetworkOptions
          networks={networks}
          onSelect={(selected) => setNetwork(selected)}
        />
      </SpacerUi>
      <SpacerUi size="xl" style={{ flex: 1 }}>
        <FlatList
          data={filteredAssets}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <AssetItem
              key={item.name}
              asset={item}
              balance={calculateBalance(item.blockchain)}
            />
          )}
        />
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({
  asset,
  balance,
}: {
  asset: AssetType;
  balance: number;
}) => (
  <SpacerUi size="3xl">
    <Link href={`/(wallet)/home/send/${asset.blockchain}`} asChild>
      <TouchableOpacity>
        <ItemUi
          title={asset.symbol}
          uri={asset.icon}
          description={asset.blockchain}
          right={<BodyTextUi weight="bold">{balance}</BodyTextUi>}
        />
      </TouchableOpacity>
    </Link>
  </SpacerUi>
);
