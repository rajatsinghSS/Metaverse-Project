require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
//https://eth-sepolia.g.alchemy.com/v2/gkvBEcmDpqbyXwpM5_-6u_3FG8qxtTrF
const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
