import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { NetworkType } from "@/@types/network";


export const UseNetworks = () => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["networks"],
        queryFn: async () => {
            if (!assets) throw new Error("NO ASSETS")

            const evmChains = assets.filter((asset) => asset.isNetwork && !asset.contractAddress)

            const networks = evmChains.map(chain => {
                return { icon: chain.icon, label: chain.name }
            })
            return networks as NetworkType[]
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};