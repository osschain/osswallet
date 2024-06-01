import { Blockchain } from "@ankr.com/ankr.js";

import { AddresTypes, addressType } from "./balances.service";

import { HistoryType } from "@/@types/history";
import { ankrProvider } from "@/config/ankr";
import { hexDecoder } from "@/util/hexDecoder";


export const getHistories = async (addresses: addressType[]) => {
    const result: HistoryType[] = []
    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const histories = await ankrProvider.getTransactionsByAddress({
                    blockchain: [],
                    address: [address],
                    pageSize: 1,
                    descOrder: true,
                });

                const filtered = histories.transactions.map(({ to, from, value, blockchain }) => {
                    return {
                        to,
                        from,
                        value: hexDecoder(value).toString(),
                        blockchain
                    }
                })

                result.push(...filtered)

            }
        }
        return result

    } catch (error) {
        throw error
    }
}

export type OSSblockchain = Blockchain | "solana" | 'btc';

export const getHistory = async (address: string, blockchain: OSSblockchain) => {

    if (blockchain === 'solana' || blockchain === "btc") {
        return null
    }

    try {
        const histories = await ankrProvider.getTransactionsByAddress({
            blockchain: [blockchain],
            address: [address],
            pageSize: 1,
            descOrder: true,
        });

        const filtered = histories.transactions.map(({ to, from, value, blockchain }) => {
            return {
                to,
                from,
                value: hexDecoder(value).toString(),
                blockchain
            }
        })

        return filtered
    } catch (error) {
        throw error
    }
}