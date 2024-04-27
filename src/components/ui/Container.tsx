import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const Container = styled.View<{ height?: "full" | "auto" }>`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  flex: ${({ height = "full" }) => (height === "full" ? 1 : null)};
`;

export const AnimatedContainer = styled(Animated.View)<{
  height?: "full" | "auto";
}>`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  flex: ${({ height = "full" }) => (height === "full" ? 1 : null)};
`;
