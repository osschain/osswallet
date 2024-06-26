import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { BodyUi } from "../ui/LayoutsUi";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

const AuthLoading = ({ label }: { label: string }) => {
  const animation = useSharedValue(0);
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + "deg",
        },
      ],
    };
  });
  useEffect(() => {
    const startAnimation = () => {
      animation.value = withRepeat(
        withTiming(360, {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1
      );
    };
    startAnimation();
    return () => {
      animation.value = 0;
    };
  }, [animation]);

  return (
    <Body>
      <BannerImage
        style={[animationStyle]}
        resizeMode="contain"
        source={require("@/assets/images/setting.png")}
      />

      <SpacerUi size="3.5xl">
        <HeaderTextUi size="2xl" weight="bold">
          {label}
        </HeaderTextUi>
      </SpacerUi>
    </Body>
  );
};

const Body = styled(BodyUi)`
  align-items: center;
  justify-content: center;
`;

const BannerImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
`;

export default AuthLoading;
