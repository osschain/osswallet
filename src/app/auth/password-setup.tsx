import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import ControllTextInputUi from "@/components/ui/ControllTexInputUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function PasswordSetup() {
  const theme = useTheme();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmShown, setIsConfirmShown] = useState(false);

  const { encryptAndSaveSeed } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const continueHandler = ({ password }: FormValues) => {
    encryptAndSaveSeed(password);
    router.push("/auth/congretulation");
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Body>
        <SpacerUi size="xl">
          <Logo
            resizeMode="contain"
            source={require("@/assets/images/unlock.png")}
          />
          <SpacerUi size="3.5xl">
            <HeaderText size="3xl" weight="extra">
              Create Password
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              We Will use your Password for secure your Seed Phrase, so create
              Strong Password
            </DescriptionText>
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="4xl">
          <ControllTextInputUi
            secureTextEntry={!isPasswordShown}
            name="password"
            control={control}
            errors={errors}
            placeholder="Password"
            right={
              <Feather
                onPress={() => setIsPasswordShown((prev) => !prev)}
                name={!isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={theme.colors["text-primary"]}
              />
            }
          />
          <SpacerUi size="2xl" />
          <ControllTextInputUi
            secureTextEntry={!isConfirmShown}
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder="Confirm Password"
            right={
              <Feather
                onPress={() => setIsConfirmShown((prev) => !prev)}
                name={!isConfirmShown ? "eye-off" : "eye"}
                size={24}
                color={theme.colors["text-primary"]}
              />
            }
          />
        </SpacerUi>
      </Body>

      <Footer>
        <SpacerUi size="2xl">
          <Continue onPress={handleSubmit(continueHandler)}>Continue</Continue>
        </SpacerUi>
      </Footer>
    </ScrollView>
  );
}

const Body = styled.View`
  flex: 1;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
  text-align: center;
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
`;

const Continue = styled(ButtonUi)`
  /* margin-top: 100px; */
`;

export default PasswordSetup;
