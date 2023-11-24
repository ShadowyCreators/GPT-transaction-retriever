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

const transaction =
  "0x354d967cf62d2c0dff6c1db897563fc4d7c4ee056fec4d7fc2397b3c2c49181a";
async function transactionInfo() {
  try {
    const response = await provider.getTransaction(transaction);
    const valueInWei = response.value;
    const valueInEther = ethers.formatEther(valueInWei);
    console.log(valueInEther);
  } catch (error) {
    console.log(error);
  }
}

transactionInfo();
