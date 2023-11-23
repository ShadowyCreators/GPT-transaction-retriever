const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { ethers } = require("ethers");
const express = require("express");
const app = express();
const port = 3000;

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

app.get("/", (req, res) => {
  res.send("Ethereum Blockchain Middleware is running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/transaction/:hash", async (req, res) => {
  try {
    const transactionHash = req.params.hash;
    const transaction = await provider.getTransaction(transactionHash);
    const valueInWei = transaction.value;
    const valueInEther = ethers.formatEther(valueInWei);
    res.json({ value: valueInEther });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
