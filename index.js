require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

async function blockNum() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);
  } catch (error) {
    console.log(error);
  }
}

blockNum();
