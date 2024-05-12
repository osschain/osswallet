import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { assets, networks } from "@/util/mock";

export default function Send() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets; // No search term, show all
    }
    return assets.filter((asset) =>
      asset.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!assets) {
    return <AlertWithImageUI title="No Chains To Display" />;
  }

  return (
    <ContainerUi>
      <TextInputUi
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search "
        left={<AntDesign name="search1" size={24} color="black" />}
      />
      <NetworkOptions
        ref={bottomSheetRef}
        networks={networks}
        onSelect={() => {}}
      />

      <SpacerUi size="xl">
        <NetworkButton onPress={handlePresentModalPress}>
          All Network
        </NetworkButton>
      </SpacerUi>
      <ChainList>
        {filteredAssets.map((chain) => (
          <SpacerUi size="3xl" key={chain.id}>
            <Link href={`(wallet)/home/send/${chain.id}`} asChild>
              <TouchableOpacity>
                <ItemUi
                  title={chain.title}
                  uri={chain.image}
                  description={chain.description}
                  right={<BodyTextUi weight="bold">15</BodyTextUi>}
                />
              </TouchableOpacity>
            </Link>
          </SpacerUi>
        ))}
      </ChainList>
    </ContainerUi>
  );
}

const ChainList = styled.View``;