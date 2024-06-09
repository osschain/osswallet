import { Blockchain } from "@ankr.com/ankr.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { AddresTypes } from "@/@types/balances";
import { getAddress } from "@/services/balances.service";
import { getEvmNft, getEvmNfts } from "@/services/nft.service";


export const useNfts = (page: number) => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["nfts", page],
        queryFn: async () => {
            if (!assets) {
                throw new Error("assets is not presented");
            }
            const address = getAddress(assets, AddresTypes.evm)

            const nfts = await getEvmNfts(address, page)
            console.log(nfts, 'nfts')
            return nfts
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

};


export const useNft = (address: string, blockchain: Blockchain, tokenId: string) => {
    return useQuery({
        queryKey: ["nft", address],
        queryFn: async () => {

            const nft = await getEvmNft(address, blockchain, tokenId)

            return nft
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

};