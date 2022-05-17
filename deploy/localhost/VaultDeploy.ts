
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";


const deployVault: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('Vault', {
    from: deployer,
    args: [ethers.utils.formatBytes32String("qwerty")],
    log: true,
  });

  showDeploymentAddress('Vault',deploymentResult)
  
};

export default deployVault;
deployVault.tags = ['Vault'];

