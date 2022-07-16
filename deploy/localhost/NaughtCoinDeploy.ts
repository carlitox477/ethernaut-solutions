
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";


const deployNaughtCoin: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer,exploiter} = await getNamedAccounts();
  const deploymentResult=await deploy('NaughtCoin', {
    from: deployer,
    args: [exploiter],
    log: true,
  });

  showDeploymentAddress('NaughtCoin',deploymentResult)
  
};

export default deployNaughtCoin;
deployNaughtCoin.tags = ['NaughtCoin'];

