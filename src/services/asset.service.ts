import { HDNodeWallet } from "ethers";

import chains from "@/data/chains.json";
import { AccountType, AssetType } from "@/providers/AssetProvider";

const bip39 = require("bip39");
const BIP84 = require('bip84')
const bs58 = require("bs58");
const { derivePath } = require("ed25519-hd-key");
const nacl = require("tweetnacl");


const solanaAccount = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const path = "m/44'/501'/0'";
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed.slice(0, 32));

    const address = bs58.encode(keypair.publicKey)
    const privateKey = bs58.encode(keypair.secretKey)

    console.log(address, privateKey)

    return { address, publicKey: address, privetKey: privateKey }

};

const btcAccount = (mnemonic: string) => {
    const root = new BIP84.fromMnemonic(mnemonic)
    const child = root.deriveAccount(0)
    const account = new BIP84.fromZPrv(child)

    return { address: account.getAddress(0), publicKey: account.getPublicKey(0), privetKey: account.getPrivateKey(0) }
}

export const createAssets = async (mnemonic: string) => {

    if (!mnemonic) {
        console.log('no Mnemonic')
        return;
    }

    try {
        const evmAccount = HDNodeWallet.fromPhrase(
            mnemonic as string
        );

        const assets = await Promise.all(chains.map(async (chain) => {
            if (chain["slip-0044"] === 60) {
                return {
                    ...chain,
                    account: evmAccount as AccountType
                };
            } else if (chain["slip-0044"] === 0) {
                return {
                    ...chain,
                    account: btcAccount(mnemonic)
                };
            } else if (chain["slip-0044"] === 501) {
                const account = await solanaAccount(mnemonic);
                return {
                    ...chain,
                    account
                };
            }
        }));

        return assets as AssetType[];
    } catch (error) {
        console.log(error);
    }
};