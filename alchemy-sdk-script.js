// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";
import fs from 'fs';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: "cuJHWme6Yc3p7V72hEGCrlLnSsXwQ6X6", // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const total_supply = 99120;
var count = 36101;
// Print owner's wallet address:
const ownerAddr = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

const options = {
    /**
     * Optional page key from an existing {@link NftContractBaseNftsResponse} or
     * {@link NftContractNftsResponse}to use for pagination.
     */
    pageKey: 1,
    /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
    omitMetadata: true,
    /**
     * Sets the total number of NFTs to return in the response. Defaults to 100.
     * Maximum page size is 100.
     */
    pageSize: 100,
    /**
     * No set timeout by default - When metadata is requested, this parameter is
     * the timeout (in milliseconds) for the website hosting the metadata to
     * respond. If you want to only access the cache and not live fetch any
     * metadata for cache misses then set this value to 0.
     */
    tokenUriTimeoutInMs: 0,
}

// Print total NFT count returned in the response:
const message = fs.createWriteStream("./message.txt");

for (var i = 36101; i < total_supply; i += 100) {
    const nftsForContract = await alchemy.nft.getNftsForContract(ownerAddr, { pageKey: i });
    // Print contract address and tokenId for each NFT:
    for (const nft of nftsForContract.nfts) {
        var data = `${nft.tokenId}, ${count}`;
        console.log(data);
        message.write(data + '\r\n');
        count++;
    }
}
message.close();




