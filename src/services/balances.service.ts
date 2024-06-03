
import { AssetType } from "@/@types/assets";
import { AddresTypes, BalancesType, AddressType } from "@/@types/balances";
import { ankrProvider } from "@/config/ankr";
import { solanaEndpoint } from "@/config/endpoints";




export const getAddress = (assets: AssetType[], type: AddresTypes) => {
    try {
        const address = assets.find((asset) => asset.blockchain === type)?.account
            .address;

        return address as string
    } catch {
        throw new Error("Can't find adress");
    }
}

export const getAdresses = (assets: AssetType[] | undefined) => {

    if (!assets) {
        throw new Error("Asset is not presented");
    }

    const evmAdress = getAddress(assets, AddresTypes.evm);
    const btcAddress = getAddress(assets, AddresTypes.btc)
    const solanaAddres = getAddress(assets, AddresTypes.solana)

    const addresses: AddressType[] = [
        { address: evmAdress, type: AddresTypes.evm },
        { address: btcAddress, type: AddresTypes.btc },
        { address: solanaAddres, type: AddresTypes.solana }
    ]
    return addresses
}

export const solanaGetBalance = async (address: string) => {
    try {
        const data = {
            jsonrpc: "2.0",
            method: "getBalance",
            params: [address],
            id: 1
        };

        const response = await fetch(solanaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const balance = await response.json()

        return balance.result.value
    } catch (error) {
        throw error
    }
}



export const fetchBalances = async (addresses: { address: string, type: AddresTypes }[]) => {
    const result: BalancesType[] = [];

    try {
        for (const { address, type } of addresses) {
            if (type === AddresTypes.evm) {
                const balances = await ankrProvider.getAccountBalance({
                    blockchain: [],
                    walletAddress: address,
                });
                result.push(...balances.assets.map((balance) => {
                    return {
                        ...balance,
                        id: balance.blockchain
                    }
                }));
            } else if (type === AddresTypes.solana) {
                const balance = await solanaGetBalance(address)
                result.push({
                    balance,
                    balanceUsd: "0",
                    id: type
                })
            } else if (type === AddresTypes.btc) {

            }
        }
        return result;
    } catch (error) {
        throw error
    }
};

export const getBalances = async (assets: AssetType[]) => {



    try {
        // if (!evmAdress) return null;
        const addresses = getAdresses(assets)
        const balances = await fetchBalances(addresses)

        const filteredBalane = balances.map(
            ({ balance, balanceUsd, id }) => {
                return {
                    balance,
                    balanceUsd,
                    id,
                };
            }
        );


        return filteredBalane;
    } catch (error) {
        throw error
    }
};