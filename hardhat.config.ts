import "hardhat-deploy"
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan"

import * as dotenv from 'dotenv'
dotenv.config()


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 export default{
  solidity: {
    compilers: [
      {version: "0.6.0"},
    ],
  },
  defaultNetwork: "hardhat",
  networks:{
    hardhat:{
    },
    rinkeby:{
      url:`https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_API_KEY}/eth/rinkeby`,
      accounts: [process.env.PRIVATE_KEY_SECOND_ACCOUNT,process.env.PRIVATE_KEY]
    }
  },
  namedAccounts:{
    deployer: 0,
    exploiter2: 0,
    exploiter: 1,
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_API_KEY
  }
  
};
