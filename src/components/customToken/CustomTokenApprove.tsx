import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import BottomSheetModalUi from "../ui/BottomSheetModal";
import ButtonUi from "../ui/ButtonUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "../ui/LayoutsUi";
import SpacerUi from "../ui/SpacerUi";

type Props = {
  onApprove: () => void;
};

const CustomTokenApprove = forwardRef<BottomSheetModal, Props>(
  ({ onApprove }, ref) => {
    const { t } = useTranslation();
    return (
      <BottomSheetModalUi ref={ref}>
        <ScrollContainerUi>
          <BodyUi>
            <SpacerUi size="xl">
              <HeaderTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-first")}
              </HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-second")}
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-third")}
              </BodyTextUi>
            </SpacerUi>

            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-forth")}
              </BodyTextUi>
            </SpacerUi>
          </BodyUi>
          <FooterUi>
            <ButtonUi onPress={onApprove}>{t("shared.import")}</ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi
                variant="secondary"
                onPress={() => ref?.current.close()}
              >
                {t("shared.cancel")}
              </ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ScrollContainerUi>
      </BottomSheetModalUi>
    );
  }
);

export default CustomTokenApprove;
