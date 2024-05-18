import { router } from "expo-router";
import { useEffect } from "react";

import AuthLoading from "@/components/auth/AuthLoading";
import { useAsset } from "@/providers/AssetProvider";
import { useAuth } from "@/providers/AuthProvider";
import { createAssets } from "@/util/ethers";

export default function WalletCreating() {
  const { addAssets } = useAsset();
  const { seed, setupPass } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const wallets = createAssets(seed as string);

      if (!wallets) {
        return;
      }
      addAssets(wallets);
      router.push("auth/congretulation");
    }, 0);
  }, []);

  return <AuthLoading label="Wallet is Creating" />;
}