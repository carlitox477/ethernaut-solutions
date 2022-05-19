
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";


const deployPrivacy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('Privacy', {
    from: deployer,
    args: [[ethers.utils.formatBytes32String("This is"),ethers.utils.formatBytes32String("a cool"),ethers.utils.formatBytes32String("password")]],
    log: true,
  });

  showDeploymentAddress('Privacy',deploymentResult)
  
};

export default deployPrivacy;
deployPrivacy.tags = ['Privacy'];

