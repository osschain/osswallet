import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import TextInputUi from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { getRandomInt } from "@/util/getRandomInt";
import { Container } from "@/components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces["4xl"]};
`;

const Continue = styled(ButtonUi)``;

const TextInput = styled(TextInputUi)``;

export default function SeedChecking() {
  const { seed } = useAuth();
  const [words, setWords] = useState<{ word: string; order: number }[] | null>(
    null
  );
  const [inputResults, setInputResults] = useState(
    Array(words?.length).fill(false)
  );

  useEffect(() => {
    if (seed) {
      const seedArray = seed.trim().split(/\s+/);
      setWords(getWords(seedArray));
    }
  }, [seed]);

  const checkPhrase = (text: string, phrase: string, index: number) => {
    const isMatch = text.toLowerCase() === phrase.toLowerCase();
    const newResults = [...inputResults];
    newResults[index] = isMatch;
    setInputResults(newResults);
    return isMatch;
  };

  const getWords = (seed: string[]) => {
    const count = 3;
    const seedLength = seed.length;
    const randomSeedWords: { word: string; order: number }[] = [];

    for (let i = 1; i <= count; i++) {
      const index = getRandomInt(seedLength);
      randomSeedWords.push({
        word: seed[index],
        order: index,
      });
    }

    return randomSeedWords;
  };

  const allPhrasesMatched = inputResults.every((result) => result);

  const onContinuePress = () => {
    if (allPhrasesMatched) {
    } else {
      Alert.alert("oops!", "Phrases are not correct", [
        { text: "ok", onPress: () => console.log("OK") },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            justifyContent: "space-between",
          }}
        >
          <SpacerUi size="4xl">
            <Header>
              <Logo
                resizeMode="contain"
                source={require("@/assets/images/cpu.png")}
              />
              <SpacerUi size="3.5xl">
                <HeaderText size="3xl" weight="extra">
                  Let's check
                </HeaderText>
              </SpacerUi>
              <SpacerUi size="xl">
                <DescriptionText size="lg" color="text-second" weight="regular">
                  To make sure you spelled the words correctly, enter words 6,
                  16 and 18
                </DescriptionText>
              </SpacerUi>
            </Header>
            <SpacerUi size="2xl" />
            {words?.map(
              (
                { word, order }: { word: string; order: number },
                index: number
              ) => (
                <SpacerUi size="xl" key={order}>
                  <TextInput
                    left={
                      <View>
                        <BodyTextUi color="text-second" weight="medium">
                          {order} .
                        </BodyTextUi>
                      </View>
                    }
                    onChangeText={(text) => checkPhrase(text, word, index)}
                  />
                </SpacerUi>
              )
            )}
          </SpacerUi>

          <Footer>
            <Continue onPress={onContinuePress}>Continue</Continue>
          </Footer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}