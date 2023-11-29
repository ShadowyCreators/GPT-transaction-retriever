require("dotenv").config();
const { ethers } = require("ethers");
const express = require("express");
const app = express();
const port = 80;

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

app.get("/", (req, res) => {
  res.send("Ethereum Blockchain Middleware is running!");
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});