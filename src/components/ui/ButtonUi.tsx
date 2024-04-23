import { ComponentPropsWithoutRef, ReactNode } from "react";
import { GestureResponderEvent, Pressable, Text } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

type Variant = "primary" | "secondary" | "red";
type Background = "blue-500" | "bg-third" | "red-500";
type TextColor = "bg-primary" | "text-primary";

type ButtonStyles = {
  [key in Variant]: {
    background: Background;
    color: TextColor;
  };
};

const buttonStyles: ButtonStyles = {
  primary: {
    background: "blue-500",
    color: "bg-primary",
  },
  secondary: {
    background: "bg-third",
    color: "text-primary",
  },
  red: {
    background: "red-500",
    color: "text-primary",
  },
};

const getBackground = (variant: Variant): Background => {
  return buttonStyles[variant].background;
};

const getTextColor = (variant: Variant): TextColor => {
  return buttonStyles[variant].color;
};

const Button = styled(Pressable)<{ variant: Variant; theme: DefaultTheme }>`
  ${({ variant, theme }) => `
      padding: ${theme.sizes.xl} 0px;
      background: ${theme.colors[getBackground(variant)]};  
  `}
`;

const ButtonText = styled(Text)<{ variant: Variant; theme: DefaultTheme }>`
  ${({ variant, theme }) => `
      color: ${theme.colors[getTextColor(variant)]};  
      text-align: center;
  `}
`;

type Props = {
  variant?: Variant;
  onPress?: (e: GestureResponderEvent) => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<typeof Pressable>;

function ButtonUi({ variant = "primary", onPress, children, ...rest }: Props) {
  return (
    <Button variant={variant} onPress={onPress} {...rest}>
      <ButtonText variant={variant}>{children}</ButtonText>
    </Button>
  );
}

export default ButtonUi;